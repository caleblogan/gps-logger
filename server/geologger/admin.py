from django.contrib import admin
from rest_framework.authtoken.admin import TokenAdmin

from .models import Log, Position


admin.site.register(Log)
admin.site.register(Position)

TokenAdmin.raw_id_fields = ('user',)
