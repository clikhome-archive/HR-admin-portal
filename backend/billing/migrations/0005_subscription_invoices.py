# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-17 18:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0004_remove_subscription_invoice'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='invoices',
            field=models.ManyToManyField(to='billing.Invoice', verbose_name='Invoice'),
        ),
    ]
