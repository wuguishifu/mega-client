import { AppBreadcrumbs } from '../../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../../components/layout/PageLayout';
import { MegaAccountSettings } from '../../../components/settings/MegaAccountSettings';

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
      <PageContent className="flex items-center justify-center">
        <MegaAccountSettings />
      </PageContent>
    </PageWrapper>
  );
}
