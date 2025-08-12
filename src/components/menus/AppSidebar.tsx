import { Plus } from 'lucide-react';

import { NavigationItem } from './NavigationItem';
import { ThemeToggle } from './ThemeToggle';
import { mainNavigationItems } from '../../lib/navigation/menuItems';
import { QuickTransferPopover } from '../transfers/QuicktransferPopover';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '../ui/sidebar';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Transfers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigationItems.map((item) => (
                <NavigationItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <QuickTransferPopover asChild>
            <SidebarGroupAction className="cursor-pointer">
              <Plus />
              <span className="sr-only">Queue Transfer</span>
            </SidebarGroupAction>
          </QuickTransferPopover>
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
