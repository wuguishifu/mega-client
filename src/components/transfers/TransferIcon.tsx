import { ArrowDownToLine, ArrowUpToLine, CircleQuestionMark, DatabaseBackup, RefreshCcw } from 'lucide-react';

export function TransferIcon({ type }: { type: string }) {
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
