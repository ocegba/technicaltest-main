from django.contrib import admin

from app.sites.models import Site


# Register your models here.
@admin.register(Site)
class SitesAdmin(admin.ModelAdmin):
    model = Site
