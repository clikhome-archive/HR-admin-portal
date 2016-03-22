from django import forms
from django.forms.models import fields_for_model
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as AccountAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from models import Account, Department, Company
from dal import autocomplete
from django.utils.translation import ugettext_lazy as _
from django.db.models import ObjectDoesNotExist
from django.core.urlresolvers import reverse


class AccountCreationForm(forms.ModelForm):
    """A form for creating new accounts. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = Account
        fields = ('email',)

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        account = super(AccountCreationForm, self).save(commit=False)
        account.set_password(self.cleaned_data["password1"])
        if commit:
            account.save()
        return account


class AccountChangeForm(forms.ModelForm):
    """A form for updating accounts. Includes all the fields on
    the account, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()
    company = forms.ModelChoiceField(label=_('Company'),
                                     queryset=Company.objects.all(),
                                     widget=autocomplete.ModelSelect2('select_company'))


    class Meta:
        model = Account
        fields = ('email', 'password', 'is_active', 'is_staff')
        # widgets = {
        #     'company': autocomplete.ModelSelect2('select_company')
        # }

    def __init__(self, *a, **kw):
        initial = kw.pop('initial', {})
        instance = kw.get('instance')
        if instance:
            try:
                initial['company'] = instance.company
            except ObjectDoesNotExist:
                pass
        super(AccountChangeForm, self).__init__(initial=initial, *a, **kw)


    def clean_password(self):
        # Regardless of what the account provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]

    def save(self, commit=True):
        instance = super(AccountChangeForm, self).save(commit)
        instance.save()
        if instance.company != self.cleaned_data.get('company'):
            instance.company = self.cleaned_data.get('company')
            instance.save()
        return instance


class AccountAdmin(AccountAdmin):
    # The forms to add and change account instances
    form = AccountChangeForm
    add_form = AccountCreationForm

    # The fields to be used in displaying the Account model.
    # These override the definitions on the base AccountAdmin
    # that reference specific fields on auth.Account.
    list_filter = list_display = ('email', 'first_name', 'last_name', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
        (('Personal info'), {'fields': ('first_name', 'last_name', 'phone')}),
        (('Company'), {'fields': ('company',)}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. AccountAdmin
    # overrides get_fieldsets to use this attribute when creating a account.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


class DepartmentForm(forms.ModelForm):
    company = forms.ModelChoiceField(label=_('Company'),
                                     queryset=Company.objects.all(),
                                     widget=autocomplete.ModelSelect2('select_company'))

    class Meta:
        model = Department
        fields = fields_for_model(Department).keys()
        widgets = {
            'users': autocomplete.ModelSelect2Multiple(None)
        }

    def __init__(self, *a, **kw):
        initial = kw.pop('initial', {})
        instance = kw.get('instance')
        if instance:
            try:
                initial['company'] = instance.company.get()
            except ObjectDoesNotExist:
                pass
        super(DepartmentForm, self).__init__(initial=initial, *a, **kw)
        if instance:
            self.fields['users'].widget.widget.url = reverse('select_user_by_company',
                                                             kwargs=dict(company_id=instance.company.get().pk))

    def save(self, commit=True):
        instance = super(DepartmentForm, self).save(commit)
        instance.save()
        if instance.company.get() != self.cleaned_data.get('company'):
            self.cleaned_data.pop('users')
            instance.users.clear() # Drop all users
            instance.company.clear()
            instance.company.add(
                self.cleaned_data.get('company')
            )
            instance.save()
        return instance


class DepartmentAddForm(DepartmentForm):
    class Meta:
        model = Department
        fields = ('name',)

    def save(self, commit=True):
        instance = super(DepartmentForm, self).save(commit)
        instance.save()
        instance.company.add(
            self.cleaned_data.get('company')
        )
        instance.save()
        return instance


class DepartmentAdmin(admin.ModelAdmin):
    ordering = search_fields = list_filter = (
        'name', 'can_use_in_procentage', 'can_use_in_licenses'
    )
    list_display = (
        'name', 'can_use_in_procentage', 'can_use_in_licenses', 'users_count'
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'company')}
        ),
    )
    form = DepartmentForm
    add_form = DepartmentAddForm

    def users_count(self, obj):
        return obj.users.count()

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super(DepartmentAdmin, self).get_fieldsets(request, obj)

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form during user creation
        """
        defaults = {}
        if obj is None:
            defaults['form'] = self.add_form
        defaults.update(kwargs)
        return super(DepartmentAdmin, self).get_form(request, obj, **defaults)

    def response_add(self, request, obj, post_url_continue=None):
        if '_addanother' not in request.POST:
            request.POST['_continue'] = 1
        return super(DepartmentAdmin, self).response_add(request, obj,
                                                   post_url_continue)


class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = fields_for_model(Company).keys()
        widgets = {
            'users': autocomplete.ModelSelect2Multiple('select_user'),
            'departments': autocomplete.ModelSelect2Multiple('select_department')
        }


class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'address')
    form = CompanyForm


admin.site.register(Account, AccountAdmin)
admin.site.unregister(Group)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Company, CompanyAdmin)