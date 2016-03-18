from django.contrib import admin
import models
from django import forms
from dal import autocomplete
from django.forms.models import fields_for_model


class SubscribeForm(forms.ModelForm):
    class Meta:
        model = models.Subscription
        fields = fields_for_model(models.Subscription).keys()
        widgets = {
            'users': autocomplete.ModelSelect2Multiple('select_user'),
            'departments': autocomplete.ModelSelect2Multiple('select_department'),
            'invoices': autocomplete.ModelSelect2Multiple('select_invoice')
        }


class InvoiceForm(forms.ModelForm):
    class Meta:
        model = models.Invoice
        fields = fields_for_model(models.Invoice).keys()
        widgets = {
            'user': autocomplete.ModelSelect2('select_user')
        }


class InvoiceAdmin(admin.ModelAdmin):
    search_fields = list_filter = list_display = (
        'user', 'invoice_number', 'invoice', 'comment', 'created_dt')
    ordering = ('-id',)
    form = InvoiceForm


class SubscribeAdmin(admin.ModelAdmin):
    search_fields = list_filter = ('payment_date', 'contract_expired_date', 'licenses',
                                   'assigned', 'comment', 'created_dt')

    list_display = ('payment_date', 'contract_expired_date', 'licenses', 'assigned',
                    'comment', 'total_users', 'total_departments',
                    'total_invoices', 'created_dt')
    ordering = ('-id',)
    readonly_fields = ('assigned',)
    form = SubscribeForm

    def total_users(self, obj):
        return obj.users.count()

    def total_departments(self, obj):
        return obj.departments.count()

    def total_invoices(self, obj):
        return obj.invoices.count()


admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Subscription, SubscribeAdmin)
