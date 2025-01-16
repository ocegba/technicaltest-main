from django.db import models


class Farmer(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Site(models.Model):
    name = models.CharField()
    farmer = models.ForeignKey(Farmer, on_delete=models.PROTECT)
