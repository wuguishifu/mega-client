import { Code, Plus } from 'lucide-react';
import Link from 'next/link';

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
  SidebarMenuButton,
  SidebarMenuItem,
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
              {mainNavigationItems
                .filter((item) => !item.hideFromSidebar)
                .map((item) => (
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
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="https://github.com/wuguishifu/mega-client" target="_blank">
                <Code />
                <span>Version 0.0.2</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
