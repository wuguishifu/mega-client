import { EllipsisVertical, File, Folder, LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Download } from '../../contract/types/downloads';

const iconMap: Record<Download['type'], LucideIcon> = {
  file: File,
  directory: Folder,
};

export function DownloadItem({ download }: { download: Download }) {
  const Icon = iconMap[download.type];

  const WrapperComponent = download.type === 'directory' ? Link : 'div';

  return (
    <WrapperComponent
      className="w-64 h-8 flex items-center overflow-hidden gap-2 bg-accent px-4 py-2 rounded-sm"
      href={`/downloads?path=${download.path}`}
    >
      <Icon size={16} strokeWidth={2} className="flex-shrink-0" />
      <span className="flex-1 text-nowrap text-ellipsis overflow-hidden">{download.name}</span>
      <EllipsisVertical size={16} strokeWidth={2} className="flex-shrink-0 cursor-pointer" />
    </WrapperComponent>
  );
}
