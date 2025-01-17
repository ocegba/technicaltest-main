import { ISensorData, ISitesList } from '@interfaces';
import { SitesService } from '@services';
import { useMutation, useQuery } from '@tanstack/react-query';


export function useQuerySitesList() {
  return useQuery<ISitesList[]>({ 
    queryKey: ["Sites"], 
    queryFn: () => SitesService.getSitesList()
  });
}

export function useQuerySiteData(siteId: number, params: any) {
  return useQuery<ISensorData[]>({
    queryKey: ["siteData", siteId, params],
    queryFn: () => SitesService.getSiteData(siteId, params),
  });
}

export function useDeleteSite(config: any) {
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => SitesService.deleteSite(id),
    ...config
  });
}