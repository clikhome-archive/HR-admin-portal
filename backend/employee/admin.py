from django.contrib import admin
import models


class EmployeeAdmin(admin.ModelAdmin):
    ordering = search_fields = list_filter = list_display = (
        'first_name', 'last_name', 'email', 'phone', 'job_title')


class EmployeeRelocationAdmin(admin.ModelAdmin):
    ordering = search_fields = list_filter = list_display = (
        'user', 'relocate_from', 'relocate_to', 'expected_moving_date',
        'status', 'created_dt')


admin.site.register(models.Employee, EmployeeAdmin)
admin.site.register(models.EmployeeRelocation, EmployeeRelocationAdmin)

