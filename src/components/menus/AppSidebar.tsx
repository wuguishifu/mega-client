import { Code, Plus } from 'lucide-react';
import Link from 'next/link';

import { NavigationItem } from './NavigationItem';
import { ThemeToggle } from './ThemeToggle';
import { mainNavigationItems, NavigationMenuItem } from '../../lib/navigation/menuItems';
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
  const { generalNavigationItems, transfersNavigationItems } = mainNavigationItems.reduce<{
    generalNavigationItems: NavigationMenuItem[];
    transfersNavigationItems: NavigationMenuItem[];
  }>(
    (acc, item) => {
      if (item.hideFromSidebar) {
        return acc;
      }

      switch (item.section) {
        case 'general':
          acc.generalNavigationItems.push(item);
          break;
        case 'transfers':
          acc.transfersNavigationItems.push(item);
          break;
      }

      return acc;
    },
    {
      generalNavigationItems: [],
      transfersNavigationItems: [],
    },
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalNavigationItems.map((item) => (
                <NavigationItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Transfers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {transfersNavigationItems.map((item) => (
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
