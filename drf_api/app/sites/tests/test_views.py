from app.sites.serializers import ListSitesSerializer
import pytest
from django.test import Client
from app.sites.models import Site
from django.urls import reverse
from rest_framework import status
import json
from random import randint


@pytest.mark.django_db
class TestListSites:
    client = Client()

    def test_list_sites_successfull(self, site_factory):
        [site_factory() for _ in range(randint(5, 10))]

        url = reverse("sites-list")
        results_len = Site.objects.all().count()
        response = self.client.get(
            url,
            content_type="application/json",
        )
        assert response.status_code == status.HTTP_200_OK
        json_data = json.loads(response.content)
        assert len(json_data) == results_len
        for site_type in json_data:
            assert ListSitesSerializer(data=site_type).is_valid()
