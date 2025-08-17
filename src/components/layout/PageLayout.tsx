import { LayoutProps } from '../../lib/utils/types';
import { SidebarButton } from '../menus/SidebarButton';

export function PageWrapper({ children }: LayoutProps) {
  return <main className="w-full h-full">{children}</main>;
}

export function PageHeader({ children }: LayoutProps) {
  return (
    <header className="w-full flex items-center gap-2 px-2.5 pt-2 fixed top-0 bg-background">
      <SidebarButton />
      {children}
    </header>
  );
}

export function PageContent({ children }: LayoutProps) {
  return <div className="pt-12 px-4 h-full">{children}</div>;
}
