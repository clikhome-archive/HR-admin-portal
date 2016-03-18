from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
import models
from django import forms
from django.forms.models import fields_for_model
from dal import autocomplete


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = models.Employee
        fields = fields_for_model(models.Employee).keys()
        widgets = {
            'user': autocomplete.ModelSelect2('select_user')
        }


class EmployeeRelocationForm(forms.ModelForm):
    class Meta:
        model = models.EmployeeRelocation
        fields = fields_for_model(models.EmployeeRelocation).keys()
        widgets = {
            'user': autocomplete.ModelSelect2('select_user'),
            'employee': autocomplete.ModelSelect2('select_employee')
        }


class EmployeeAdmin(admin.ModelAdmin):
    ordering = search_fields = list_filter = list_display = (
        'first_name', 'last_name', 'email', 'phone', 'job_title', 'is_reusable')
    form = EmployeeForm


class EmployeeRelocationAdmin(admin.ModelAdmin):
    list_display = (
        'user', '_user_company_name', 'employee', 'relocate_from', 'relocate_to', 'expected_moving_date',
        '_need_furniture', '_duration', 'status', 'created_dt', 'updated_dt')
    ordering = search_fields = list_filter = (
        'user', 'relocate_from', 'relocate_to', 'expected_moving_date',
        'need_furniture', 'duration', 'status', 'created_dt', 'updated_dt')
    form = EmployeeRelocationForm

    def _need_furniture(self, instance):
        return instance.need_furniture
    _need_furniture.short_description = _('Need furniture')
    _need_furniture.boolean = True

    def _duration(self, instance):
        return instance.duration_title
    _duration.short_description = _('Preferred lease term')

    def _user_company_name(self, obj):
        return obj.user.company_name
    _user_company_name.short_description = _('Company name')
    _user_company_name.admin_order_field = 'user__company_name'

admin.site.register(models.Employee, EmployeeAdmin)
admin.site.register(models.EmployeeRelocation, EmployeeRelocationAdmin)

