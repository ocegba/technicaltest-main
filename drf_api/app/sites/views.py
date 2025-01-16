from app.sites.models import Site
from app.sites.serializers import ListSitesSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema


# Create your views here.
class SitesListView(generics.ListAPIView):
    model = Site
    queryset = Site.objects.all()
    serializer_class = ListSitesSerializer

    @extend_schema(
        operation_id="List Species",
        responses={
            200: ListSitesSerializer,
        },
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
