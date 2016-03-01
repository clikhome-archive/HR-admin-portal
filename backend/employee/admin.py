from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
import models


class EmployeeAdmin(admin.ModelAdmin):
    ordering = search_fields = list_filter = list_display = (
        'first_name', 'last_name', 'email', 'phone', 'job_title', 'is_reusable')


class EmployeeRelocationAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'relocate_from', 'relocate_to', 'expected_moving_date',
        '_need_furniture', '_duration', 'status', 'created_dt', 'updated_dt')
    ordering = search_fields = list_filter = (
        'user', 'relocate_from', 'relocate_to', 'expected_moving_date',
        'need_furniture', 'duration', 'status', 'created_dt', 'updated_dt')

    def _need_furniture(self, instance):
        return instance.need_furniture
    _need_furniture.short_description = _('Need furniture')
    _need_furniture.boolean = True

    def _duration(self, instance):
        return instance.duration_title
    _duration.short_description = _('Preferred lease term')


admin.site.register(models.Employee, EmployeeAdmin)
admin.site.register(models.EmployeeRelocation, EmployeeRelocationAdmin)

