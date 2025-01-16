import factory
from pytest_factoryboy import register
from app.sites.models import Farmer, Site


class FarmerFactory(factory.django.DjangoModelFactory):
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")

    class Meta:
        model = Farmer


class SiteFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("city")
    farmer = factory.SubFactory(FarmerFactory)

    class Meta:
        model = Site


register(SiteFactory)
