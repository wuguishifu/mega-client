import { PageLayout } from '../../components/layout/PageLayout';
import { LayoutProps } from '../../lib/utils/types';

export default function TransfersLayout({ children }: LayoutProps) {
  return (
    <PageLayout.Wrapper>
      <PageLayout.Header>
        <h1>Transfers</h1>
      </PageLayout.Header>
      <PageLayout.Content>{children}</PageLayout.Content>
    </PageLayout.Wrapper>
  );
}
