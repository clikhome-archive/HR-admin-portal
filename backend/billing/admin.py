from django.contrib import admin
import models


class InvoiceAdmin(admin.ModelAdmin):
    search_fields = list_filter = list_display = (
        'user', 'invoice', 'comment', 'created_dt')
    ordering = ('-id',)


class SubscribeAdmin(admin.ModelAdmin):
    search_fields = list_filter = list_display = (
        'user', 'invoice', 'expired', 'licenses', 'assigned', 'comment', 'created_dt')
    ordering = ('-id',)
    readonly_fields = ('assigned',)


admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Subscription, SubscribeAdmin)
