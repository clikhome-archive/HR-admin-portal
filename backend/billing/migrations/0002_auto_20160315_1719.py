# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-15 23:19
from __future__ import unicode_literals

from django.db import migrations
import s3direct.fields


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='invoice',
            field=s3direct.fields.S3DirectField(verbose_name='Invoice'),
        ),
    ]
