from django.urls import path

from .views import SitesListView, SiteDataView, DeleteSiteView

sites_urls = [
    path("", SitesListView.as_view(), name="sites-list"),
    path("<int:site_id>/data/", SiteDataView.as_view(), name="site-data"),
    path("<int:pk>/", DeleteSiteView.as_view(), name="site-delete"),
]
