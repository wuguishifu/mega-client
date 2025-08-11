'use client';

import { transfersColumns } from './TransfersColumns';
import { useGetTransfersQuery } from '../../api/transfersApiSlice';
import { DataTable } from '../table/DataTable';

export function TransfersTable() {
  const { data, isLoading } = useGetTransfersQuery();
  return <DataTable columns={transfersColumns} data={data?.transfers || []} loading={isLoading} />;
}
