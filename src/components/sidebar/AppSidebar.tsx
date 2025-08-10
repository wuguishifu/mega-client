import { HardDriveDownload, Home, LucideIcon } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

import { ThemeToggle } from './ThemeToggle';
import { getMeta } from '../../lib/utils/getOSFromUserAgent';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

type MenuItem = { title: string; url: string; icon: LucideIcon; shortcut?: string };

const menuItems: MenuItem[] = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Transfers', url: '/transfers', icon: HardDriveDownload },
];

export async function AppSidebar() {
  const headersRes = await headers();
  const metaKey = getMeta(headersRes.get('user-agent'));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.shortcut && (
                    <SidebarMenuBadge className="opacity-50">
                      {metaKey}
                      {item.shortcut}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
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
