# Generated by Django 5.0.4 on 2024-04-24 16:34

from django.db import migrations

def create_permits(apps, schema_editor):
    Permit = apps.get_model('field_trips', 'Permit')
    permits_data = [
        {'name': 'Discover Pass',
         'type': 'State',
         'day_cost': 11.50,
         'annual_cost': 35.00},
         {'name': 'Oregon State Parks',
         'type': 'State',
         'day_cost': 5.00,
         'annual_cost': 30.00},
         {'name': 'Northwest Forest Pass',
         'type': 'Federal',
         'day_cost': 5.00,
         'annual_cost': 30.00},
         {'name': 'America the Beautiful',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 80.00},
         {'name': 'Oregon Fish & Wildlife-parking',
         'type': 'State',
         'day_cost': 10,
         'annual_cost': 30},
         {'name': 'Oregon Fish & Wildlife-forage Sauvie Island',
         'type': 'State',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Mt Hood National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Gifford Pinchot National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Ochoco National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Deschutes National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Fremont-Winema National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
         {'name': 'Umpqua National Forest',
         'type': 'Federal',
         'day_cost': 0,
         'annual_cost': 0},
    ]
    for permit_data in permits_data:
        Permit.objects.create(**permit_data)

class Migration(migrations.Migration):

    dependencies = [
        ('field_trips', '0017_remove_permit_cost_permit_annual_cost_and_more'),
    ]

    operations = [
        migrations.RunPython(create_permits)
    ]
