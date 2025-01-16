from django.urls import path

from .views import SitesListView

sites_urls = [
    path("", SitesListView.as_view(), name="sites-list"),
]
