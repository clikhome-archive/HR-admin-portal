from django.contrib import admin
import models


class FeedbackAdmin(admin.ModelAdmin):
    search_fields = ('subject', 'body')
    ordering = list_filter = list_display = ('subject',)


admin.site.register(models.Feedback, FeedbackAdmin)
