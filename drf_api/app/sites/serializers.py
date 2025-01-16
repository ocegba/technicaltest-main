from app.sites.models import Site
from rest_framework import serializers


class ListSitesSerializer(serializers.ModelSerializer):
    farmer = serializers.StringRelatedField()

    class Meta:
        model = Site
        fields = "__all__"
