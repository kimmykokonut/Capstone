# Generated by Django 5.0.4 on 2024-04-16 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('field_trips', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mushroom',
            name='info_url',
            field=models.URLField(blank=True),
        ),
    ]
