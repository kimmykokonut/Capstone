# Generated by Django 5.0.4 on 2024-04-17 19:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('field_trips', '0003_auto_20240416_1627'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='role',
        ),
        migrations.AlterField(
            model_name='profile',
            name='expiration_date',
            field=models.DateField(default=datetime.datetime(2025, 4, 17, 19, 38, 8, 145190, tzinfo=datetime.timezone.utc)),
        ),
    ]
