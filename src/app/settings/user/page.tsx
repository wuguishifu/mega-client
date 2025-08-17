import { AppBreadcrumbs } from '../../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../../components/layout/PageLayout';

const breadcrumbs = [
  { url: '/', title: 'Home' },
  { url: '/settings', title: 'Settings' },
  { url: '/settings/user', title: 'User' },
];

export default function UserSettings() {
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
