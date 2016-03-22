from django.contrib import admin
import models
from django import forms
from dal import autocomplete
from django.forms.models import fields_for_model
from django.utils.html import format_html_join


class InvoiceForm(forms.ModelForm):
    class Meta:
        model = models.Invoice
        fields = fields_for_model(models.Invoice).keys()
        widgets = {
            'company': autocomplete.ModelSelect2('select_company')
        }


class InvoiceAdmin(admin.ModelAdmin):
    search_fields = list_filter = list_display = (
        'company', 'invoice_number', 'invoice', 'comment', 'created_dt')
    ordering = ('-id',)
    form = InvoiceForm


class SubscribeForm(forms.ModelForm):
    class Meta:
        model = models.Subscription
        fields = fields_for_model(models.Subscription).keys()
        widgets = {
            'departments': autocomplete.ModelSelect2Multiple('select_department'),
            'invoices': autocomplete.ModelSelect2Multiple('select_invoice'),
            'company': autocomplete.ModelSelect2('select_company')
        }


class SubscribeAdmin(admin.ModelAdmin):
    search_fields = list_filter = ('payment_date', 'contract_expired_date', 'licenses',
                                   'assigned', 'comment', 'created_dt', 'company')
    list_display = ('payment_date', 'contract_expired_date', 'licenses', 'assigned',
                    'comment', 'departments_list', 'invoices_list', 'created_dt', 'company')
    ordering = ('-id',)
    readonly_fields = ('assigned',)
    form = SubscribeForm

    def departments_list(self, obj):
        return format_html_join(
            '\n',
            '<li><a href="{}" target="_blank">{}</a></li>',
            ((d.get_admin_absolute_url(), d.name) for d in obj.departments.all())
        )
    departments_list.short_description = u'Departments'

    def invoices_list(self, obj):
        return format_html_join(
            '\n',
            '<li><a href="{}" target="_blank">{}</a></li>',
            ((i.get_admin_absolute_url(), i.invoice_number) for i in obj.invoices.all())
        )
    invoices_list.short_description = u'Invoices'

    def total_departments(self, obj):
        return obj.departments.count()

    def total_invoices(self, obj):
        return obj.invoices.count()


admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Subscription, SubscribeAdmin)
