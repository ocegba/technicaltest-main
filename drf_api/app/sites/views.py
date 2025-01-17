from app.sites.models import Site
from app.sites.serializers import ListSitesSerializer
from rest_framework import generics, status
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from app.sites.services import InfluxQueryService

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

class SiteDataView(APIView):
    def get(self, request, site_id):
        measurement = request.query_params.get("measurement", "temperature")
        fields = request.query_params.getlist("fields", ["air_temperature", "soil_temperature"])
        positions = request.query_params.getlist("positions", ["in", "out"])

        try:
            data = InfluxQueryService.get_site_data(
                site_id=site_id,
                measurement=measurement,
                fields=fields,
                positions=positions,
            )
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteSiteView(APIView):
    def delete(self, request, pk):
        try:
            site = Site.objects.get(pk=pk)
            site.delete()
            return Response({"message": "Site deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Site.DoesNotExist:
            return Response({"error": "Site not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)