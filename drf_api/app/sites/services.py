from typing import List

from django.conf import settings
from influxdb_client import InfluxDBClient

client = InfluxDBClient(
    url=settings.INFLUXDB_URL,
    token=settings.INFLUXDB_TOKEN,
    org=settings.INFLUXDB_ORG,
    timeout=settings.INFLUXDB_TIMEOUT,
    verify_ssl=settings.INFLUXDB_VERIFY_SSL,
    enable_gzip=True,
    debug=False,
)
query_api = client.query_api()


class InfluxQueryService:
    @staticmethod
    def get_site_data(
        site_id: int,
        measurement: str = "temperature",
        fields: List[str] = ["air_temperature", "soil_temperature"],
        positions: List[str] = ["in", "out"],
    ):
        """
        Parameters
        ----------
        site_id: int
        measurement : str
        fields: List[str] - Could be "air_temperature" and/or "soil_temperature"
        position: List[str] - "in" and/or "out"

        Returns
        -------
        dict
            A dictionary with the following keys:
            - time: a 1D datetime64 numpy array
            - measurement: a 1D numpy array string with measurement data
        """
        field_condition = " or ".join([f'r["_field"] == "{field}"' for field in fields])
        field_filter = f"|> filter(fn: (r) => {field_condition})"

        position_condition = " or ".join(
            [f'r["position"] == "{position}"' for position in positions]
        )
        position_filter = f"|> filter(fn: (r) => {position_condition})"

        flux_query = f"""\
from(bucket: "sensors")
|> range(start: -1y)
|> filter(fn: (r) => r["_measurement"] == "{measurement}")
{field_filter}
|> filter(fn: (r) => r["site_id"] == "{site_id}")
{position_filter}
|> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
|> yield(name: "mean")
"""

        tables = query_api.query(flux_query)
        values_list = tables.to_values(
            columns=["_time", "_field", "_value", "position"]
        )

        device_data = [
            {
                "time": time.isoformat(),
                "field": field,
                "value": value,
                "position": position,
            }
            for time, field, value, position in values_list
        ]

        return device_data
