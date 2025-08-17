import { PageContent, PageHeader, PageWrapper } from '../../components/layout/PageLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../../components/ui/breadcrumb';
import { LayoutProps } from '../../lib/utils/types';

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <PageWrapper>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageHeader>
      <PageContent>{children}</PageContent>
    </PageWrapper>
  );
}
