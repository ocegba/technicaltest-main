import { SitesList } from '@elements/SitesList';
import { useQuerySitesList, useDeleteSite, useQuerySiteData } from '@hooks';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import SensorGraph from '@components/SensorGraph';

const Sites = () => {
  const { data: sitesListData, isLoading } = useQuerySitesList(); 
  const [localSitesList, setLocalSitesList] = useState<typeof sitesListData | undefined>(undefined);
  const [selectedSiteId, setSelectedSiteId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (sitesListData) {
      setLocalSitesList(sitesListData);
    }
  }, [sitesListData]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSiteId(parseInt(event.target.value));
  };

  const { mutate: deleteSite } = useDeleteSite({
    onSuccess: () => {
      message.success("Site supprimé avec succès");
    },
    onError: (error: any) => {
      message.error("Erreur lors de la suppression");
      console.error("Error deleting site:", error);
    },
  });

  const handleDelete = (id: number) => {
    deleteSite(id);
    setLocalSitesList((prev) => prev?.filter((site) => site.id !== id));
  };

  const { data: sensorData, isLoading: isSensorDataLoading, error: sensorDataError } = useQuerySiteData(
    selectedSiteId ?? 0,
    { measurement: 'temperature' } // Vous pouvez ajuster selon les paramètres nécessaires
  );

  const dataForGraph = sensorData ? sensorData : [];

  return (
    <div className="card">
      <h3 className="mb-2">Projets</h3>
      {isLoading ? (
        <p>Chargement des sites...</p>
      ) : localSitesList && localSitesList.length > 0 ? (
        <div>
          <p>Select the site that you want to see the graph</p>
          <select
            value={selectedSiteId || ''}
            onChange={handleChange}
            className="form-select"
          >
            <option value="" disabled>
              Select a site
            </option>
            {localSitesList.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>No sites available.</p>
      )}

      <div className="col-span-2">
        {localSitesList && localSitesList.length > 0 ? (
          <SitesList sites={localSitesList} handleDelete={handleDelete} />
        ) : (
          <p>No sites available.</p>
        )}
      </div>

      <h3>Sensor Data</h3>
      <div>
        {isSensorDataLoading ? (
          <p>Loading sensor data...</p>
        ) : sensorDataError ? (
          <p>Error loading sensor data</p>
        ) : selectedSiteId && dataForGraph?.length > 0 ? (
          <SensorGraph data={dataForGraph} />
        ) : (
          <p>No sensor data available for this site.</p>
        )}
      </div>
        
    </div>
  );
};

export default Sites;
