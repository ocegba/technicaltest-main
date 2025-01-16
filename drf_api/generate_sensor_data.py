import random
from datetime import datetime, timedelta

import app.wsgi  # to prevent "Apps arent't loaded yet" error
import pandas as pd
from django.conf import settings
from app.sites.models import Site
from influxdb_client import InfluxDBClient, Point, WriteOptions

site_ids = [site.id for site in Site.objects.all()]
positions = ["in", "out"]
start_date = datetime(2024, 1, 1)
end_date = start_date + timedelta(days=365)
date_range = pd.date_range(start=start_date, end=end_date, freq="15min")


def generate_temperature(sensor_type, position):
    if sensor_type == "air_temperature":
        if position == "in":
            return round(random.uniform(0, 35), 2)
        else:
            return round(random.uniform(-2, 37), 2)
    elif sensor_type == "soil_temperature":
        if position == "in":
            return round(random.uniform(3, 32), 2)
        else:
            return round(random.uniform(0, 35), 2)


client = InfluxDBClient(
    url=settings.INFLUXDB_URL,
    token=settings.INFLUXDB_TOKEN,
    org=settings.INFLUXDB_ORG,
    timeout=settings.INFLUXDB_TIMEOUT,
    verify_ssl=settings.INFLUXDB_VERIFY_SSL,
    enable_gzip=True,
    debug=False,
)

with client.write_api(
    write_options=WriteOptions(batch_size=100, flush_interval=5000)
) as write_api:

    for site_id in site_ids:
        for position in positions:
            for timestamp in date_range:
                air_temperature = generate_temperature("air_temperature", position)
                soil_temperature = generate_temperature("soil_temperature", position)

                air_point = (
                    Point("temperature")
                    .tag("site_id", site_id)
                    .tag("position", position)
                    .field("air_temperature", air_temperature)
                    .time(timestamp)
                )

                soil_point = (
                    Point("temperature")
                    .tag("site_id", site_id)
                    .tag("position", position)
                    .field("soil_temperature", soil_temperature)
                    .time(timestamp)
                )

                write_api.write(bucket="sensors", record=[air_point, soil_point])
                write_api.flush()

print("Les données ont été envoyées avec succès à InfluxDB.")
