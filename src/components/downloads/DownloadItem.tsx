import { EllipsisVertical, File, Folder, LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { DownloadItemDropdownMenu } from './DownloadItemDropdownMenu';
import { Download } from '../../contract/types/downloads';

const iconMap: Record<Download['type'], LucideIcon> = {
  file: File,
  directory: Folder,
};

export function DownloadItem({ download }: { download: Download }) {
  const Icon = iconMap[download.type];

  const WrapperComponent = download.type === 'directory' ? Link : 'span';

  return (
    <div className="w-64 h-8 flex items-center overflow-hidden gap-2 bg-accent px-4 py-2 rounded-sm">
      <WrapperComponent
        className="flex flex-1 items-center overflow-hidden gap-2"
        href={`/downloads?path=${download.path}`}
      >
        <Icon size={16} strokeWidth={2} className="flex-shrink-0" />
        <span className=" text-nowrap text-ellipsis overflow-hidden">{download.name}</span>
      </WrapperComponent>
      <DownloadItemDropdownMenu item={download}>
        <EllipsisVertical size={16} strokeWidth={2} className="flex-shrink-0 cursor-pointer" />
      </DownloadItemDropdownMenu>
    </div>
  );
}
