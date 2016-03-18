# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-17 20:47
from __future__ import unicode_literals

import billing.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0006_invoice_invoice_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscription',
            name='expired',
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='user',
        ),
        migrations.AddField(
            model_name='subscription',
            name='contract_expired_date',
            field=models.DateField(default=billing.models.get_contract_expired_date, verbose_name='Contract expired'),
        ),
        migrations.AddField(
            model_name='subscription',
            name='payment_date',
            field=models.DateField(default=billing.models.get_payment_date, verbose_name='Payment date'),
        ),
    ]
