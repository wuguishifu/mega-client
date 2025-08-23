import { useListDownloadsQuery } from '../api/downloadsApiSlice';

export function useDownloads(path = '/') {
  const cleanedPath = path.replace('..', '.');
  const { data, isLoading } = useListDownloadsQuery({ path: cleanedPath });

  return { data, isLoading };
}
