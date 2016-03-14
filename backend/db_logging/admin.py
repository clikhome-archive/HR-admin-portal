from django.contrib import admin
import models


class LogAdmin(admin.ModelAdmin):
    search_fields = list_filter = (
        'user', 'event', 'url', 'method', 'created_dt')
    list_display = (
        'user', 'event', 'url', 'method', 'content_object', 'created_dt')
    ordering = ('-id',)

    # readonly_fields = models.Log._meta.get_all_field_names()
    #
    # def has_add_permission(self, request, obj=None):
    #     return False
    #
    # def has_delete_permission(self, request, obj=None):
    #     return False


admin.site.register(models.Log, LogAdmin)

