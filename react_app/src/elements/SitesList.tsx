import { EmptyOb } from '@components/Empty';
import { IconTrash } from '@components/Icons/IconTrash';
import { TableOb } from '@components/Table/Table';
import { ISitesList } from '@interfaces';
import { Tooltip } from 'antd';

interface ISiteList {
  sites: ISitesList[] | undefined;
  handleDelete?: (id: number) => void;
}

export const SitesList = ({ sites, handleDelete }: ISiteList) => {
  return (
    <div>
      <h4 className="mb-2">Sites</h4>
      <TableOb>
        <TableOb.Thead>
          <TableOb.Tr>
            <TableOb.Th>Name</TableOb.Th>
            <TableOb.Th>Farmer</TableOb.Th>
            <TableOb.Th>Actions</TableOb.Th>
          </TableOb.Tr>
        </TableOb.Thead>

        <TableOb.Tbody>
          {sites && sites.length > 0 ? (
            sites.map((site) => (
              <TableOb.Tr key={site.id}>
                <TableOb.Td>{site.name}</TableOb.Td>
                <TableOb.Td>{site.farmer}</TableOb.Td>
                  <TableOb.Td>
                    <div className="flex gap-1">
                      <Tooltip key={site.id} title={'Supprimer'}>
                        <button
                          className="simulations__actions simulations__actions--delete simulations__actions--small flex items-center gap-1"
                          onClick={() => handleDelete && handleDelete(site.id)}
                          type="button">
                          <IconTrash height={16} width={16} />
                        </button>
                      </Tooltip>
                    </div>
                  </TableOb.Td>
              </TableOb.Tr>
            ))
          ) : (
            <TableOb.Tr className="empty">
              <TableOb.Td colSpan={100}>
                <EmptyOb
                  height={150}
                  message={"Pas de site"}
                  title={"Sites"}
                  small
                />
              </TableOb.Td>
            </TableOb.Tr>
          )}
        </TableOb.Tbody>
      </TableOb>
    </div>
  );
};

export default SitesList;
