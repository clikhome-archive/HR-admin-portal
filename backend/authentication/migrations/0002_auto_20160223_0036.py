# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-23 00:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='company_address',
            field=models.CharField(blank=True, max_length=200, verbose_name='Company Address'),
        ),
        migrations.AddField(
            model_name='account',
            name='company_name',
            field=models.CharField(blank=True, max_length=100, verbose_name='Company Name'),
        ),
        migrations.AddField(
            model_name='account',
            name='phone',
            field=models.CharField(blank=True, max_length=40, verbose_name='Contact phone number'),
        ),
    ]
