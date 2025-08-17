'use client';

import { transfersColumns } from './TransfersColumns';
import { useGetTransfersQuery } from '../../api/transfersApiSlice';
import { DataTable } from '../table/DataTable';

export function TransfersTable() {
  const { data, isLoading } = useGetTransfersQuery(undefined, { pollingInterval: 5_000 });
  return <DataTable columns={transfersColumns} data={data?.transfers || []} loading={isLoading} />;
}
