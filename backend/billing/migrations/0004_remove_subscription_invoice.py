# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-17 18:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0003_auto_20160316_1214'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscription',
            name='invoice',
        ),
    ]