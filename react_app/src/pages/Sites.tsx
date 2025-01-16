import { SitesList } from '@elements/SitesList';
import { useQuerySitesList } from '@hooks';

const Sites = () => {
  const { data: sitesListData } = useQuerySitesList();
  
  return (
    <>
      <div className="card">
        <h3 className="mb-2">Projets</h3>
          <div className="col-span-2">
            <SitesList sites={sitesListData} />
          </div>
      </div>
    </>
  );
};

export default Sites;
