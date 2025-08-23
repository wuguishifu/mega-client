import { redirect } from 'next/navigation';

import { DownloadsList } from '../../components/downloads/DownloadsList';
import { AppBreadcrumbs } from '../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../components/layout/PageLayout';

const defaultBreadcrumbs = [
  { url: '/', title: 'Home' },
  { url: '/downloads', title: 'Downloads' },
];

export default async function Downloads({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const path = (await searchParams).path;
  if (!path) {
    return redirect('/downloads?path=.');
  }

  const breadcrumbs = [
    ...defaultBreadcrumbs,
    ...path
      .split('/')
      .filter((item) => item !== '.')
      .map((item, index, array) => ({
        url: `/downloads?path=./${array.slice(0, index + 1).join('/')}`,
        title: item || 'Root',
      })),
  ];

  return (
    <PageWrapper>
      <PageHeader>
        <AppBreadcrumbs>{breadcrumbs}</AppBreadcrumbs>
      </PageHeader>
      <PageContent>
        <DownloadsList path={path} />
      </PageContent>
    </PageWrapper>
  );
}
