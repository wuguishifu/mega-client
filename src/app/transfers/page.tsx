'use client';

import { useGetTransfersQuery } from '../../api/transfersApiSlice';
import { TransferItem } from '../../components/transfers/TransferItem';

export default function Transfers() {
  const { data } = useGetTransfersQuery();

  return (
    <main>
      <h1>Transfers</h1>
      {data?.transfers.map((item) => (
        <TransferItem key={item.tag} item={item} />
      ))}
    </main>
  );
}
