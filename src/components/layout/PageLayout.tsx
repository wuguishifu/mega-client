import { LayoutProps } from '../../lib/utils/types';
import { SidebarButton } from '../menus/SidebarButton';

function Wrapper({ children }: LayoutProps) {
  return <main className="w-full">{children}</main>;
}

function Header({ children }: LayoutProps) {
  return (
    <header className="flex items-center gap-2 px-2.5 mt-2">
      <SidebarButton />
      {children}
    </header>
  );
}

function Content({ children }: LayoutProps) {
  return <div className="mt-4 px-4">{children}</div>;
}

export const PageLayout = {
  Wrapper,
  Header,
  Content,
};
