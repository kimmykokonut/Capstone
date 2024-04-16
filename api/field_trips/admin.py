from django.contrib import admin
from .models import Registration, Mushroom, Trip, Profile

admin.site.register(Profile)
admin.site.register(Registration)
admin.site.register(Trip)
admin.site.register(Mushroom)