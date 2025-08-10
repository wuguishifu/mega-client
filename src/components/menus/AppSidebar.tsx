import { HardDriveDownload, Home } from 'lucide-react';

import { NavigationItem } from './NavigationItem';
import { ThemeToggle } from './ThemeToggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from '../ui/sidebar';

const mainNavigationItems: NavigationItem[] = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Transfers', url: '/transfers', icon: HardDriveDownload },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigationItems.map((item) => (
                <NavigationItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <ThemeToggle />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
