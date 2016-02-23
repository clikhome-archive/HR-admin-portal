# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-23 00:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_auto_20160222_2328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeerelocation',
            name='employees',
        ),
        migrations.AddField(
            model_name='employeerelocation',
            name='employee',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='employee.Employee', verbose_name='Employee'),
            preserve_default=False,
        ),
    ]
