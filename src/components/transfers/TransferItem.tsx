import { ArrowDownToLine, ArrowUpToLine, CircleQuestionMark, DatabaseBackup, RefreshCcw } from 'lucide-react';

import { Transfer } from '../../contract/types/transfers';

function TransferIcon({ type }: { type: string }) {
  switch (type) {
    case '⇓':
      return <ArrowDownToLine />;
    case '⇑':
      return <ArrowUpToLine />;
    case '⇵':
      return <RefreshCcw />;
    case '⏫':
      return <DatabaseBackup />;
    default:
      return <CircleQuestionMark />;
  }
}

export function TransferItem({ item }: { item: Transfer }) {
  // return <pre>{JSON.stringify(item, null, 2)}</pre>;

  return (
    <div className="flex">
      <TransferIcon type={item.type} />
      <span>Path: {item.sourcePath}</span>
    </div>
  );
}
