import { ISitesList } from '@interfaces';
import axios from 'axios';

export const SitesService = {
  getSitesList: async (): Promise<ISitesList> => {
    try {
      const sites = await axios.get(`${import.meta.env.VITE_API_URL}/sites/`, { 'headers': { 'Content-Type': 'application/json' } });
      return sites.data;
    } catch (error) {
      console.error('Error fetching sites list:', error);
      throw error;
    }
  },
};