import { AppBreadcrumbs } from '../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../components/layout/PageLayout';
import { TransfersTable } from '../../components/transfers/TransfersTable';

const breadcrumbs = [
  { url: '/', title: 'Home' },
  { url: '/transfers', title: 'Transfers' },
];

export default function Transfers() {
  return (
    <PageWrapper>
      <PageHeader>
        <AppBreadcrumbs>{breadcrumbs}</AppBreadcrumbs>
      </PageHeader>
      <PageContent>
        <TransfersTable />
      </PageContent>
    </PageWrapper>
  );
}
