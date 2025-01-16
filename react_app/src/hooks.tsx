import { SitesService } from '@services';
import { useQuery } from '@tanstack/react-query';


export function useQuerySitesList() {
  return useQuery({ 
    queryKey: ["Sites"], 
    queryFn: () => SitesService.getSitesList()
  });
}
