# Generated by Django 5.0.4 on 2024-04-19 16:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('field_trips', '0013_alter_profile_expiration_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='waitlist',
            field=models.IntegerField(default=6),
        ),
        migrations.AlterField(
            model_name='profile',
            name='expiration_date',
            field=models.DateField(default=datetime.datetime(2025, 4, 19, 16, 4, 10, 670623, tzinfo=datetime.timezone.utc)),
        ),
    ]
