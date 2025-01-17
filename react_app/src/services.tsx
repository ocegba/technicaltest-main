import { ISensorData, ISitesList } from '@interfaces';
import axios from 'axios';

export const SitesService = {
  getSitesList: async (): Promise<ISitesList[]> => {
    try {
      const sites = await axios.get(`${import.meta.env.VITE_API_URL}/sites/`, { 'headers': { 'Content-Type': 'application/json' } });
      return sites.data;
    } catch (error) {
      console.error('Error fetching sites list:', error);
      throw error;
    }
  },

  getSiteData: async (siteId: number, params: any): Promise<ISensorData[]> => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sites/${siteId}/data/`, { 'headers': { 'Content-Type': 'application/json' }, params });
      console.log('Fetching sensor data with params:', params);

      return data;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      throw error;
    }
  },

  deleteSite: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sites/${id}/`, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(`Site with ID ${id} deleted`);
    } catch (error) {
      console.error('Error deleting site:', error);
      throw error;
    }
  },
    
};