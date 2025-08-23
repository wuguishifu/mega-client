'use client';

import { useState } from 'react';

import { DownloadItem } from './DownloadItem';
import { Download } from '../../contract/types/downloads';
import { useDownloads } from '../../hooks/useDownloads';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

export function DownloadsList({ path }: { path?: string }) {
  const { data, isLoading } = useDownloads(path);
  const [showHidden, setShowHidden] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.length) {
    return (
      <>
        <div className="flex flex-row items-center">
          <Label className="cursor-pointer">
            <Checkbox onCheckedChange={(state) => setShowHidden(!!state)} checked={showHidden} />
            <span>Show Hidden</span>
          </Label>
        </div>
        <h2 className="my-4 text-xl font-bold">No items.</h2>
      </>
    );
  }

  const { folders, files } = data.reduce<{
    folders: Download[];
    files: Download[];
  }>(
    (acc, download) => {
      if (!showHidden && download.name.startsWith('.')) {
        return acc;
      }

      if (download.type === 'directory') {
        acc.folders.push(download);
      } else {
        acc.files.push(download);
      }
      return acc;
    },
    { folders: [], files: [] },
  );

  return (
    <>
      <div className="flex flex-row items-center">
        <Label className="cursor-pointer">
          <Checkbox onCheckedChange={(state) => setShowHidden(!!state)} checked={showHidden} />
          <span>Show Hidden</span>
        </Label>
      </div>
      {folders.length > 0 && (
        <>
          <h2 className="my-4 text-xl font-bold">Folders</h2>
          <div className="flex items-center w-full flex-wrap gap-4">
            {folders.map((download) => (
              <DownloadItem key={download.path} download={download} />
            ))}
          </div>
        </>
      )}
      {files.length > 0 && (
        <>
          <h2 className="my-4 text-xl font-bold">Files</h2>
          <div className="flex items-center w-full flex-wrap gap-4">
            {files.map((download) => (
              <DownloadItem key={download.path} download={download} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
