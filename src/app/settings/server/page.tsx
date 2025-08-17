import { AppBreadcrumbs } from '../../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../../components/layout/PageLayout';

const breadcrumbs = [
  { url: '/', title: 'Home' },
  { url: '/settings', title: 'Settings' },
  { url: '/settings/server', title: 'Server' },
];

export default function ServerSettings() {
  return (
    <PageWrapper>
      <PageHeader>
        <AppBreadcrumbs>{breadcrumbs}</AppBreadcrumbs>
      </PageHeader>
      <PageContent>
        <></>
      </PageContent>
    </PageWrapper>
  );
}
