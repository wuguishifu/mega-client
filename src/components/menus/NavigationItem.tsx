import Link from 'next/link';

import { ChordBadge } from './ChordBadge';
import { NavigationMenuItem } from '../../lib/navigation/menuItems';
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export function NavigationItem({ item }: { item: NavigationMenuItem }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.chord && (
        <ChordBadge wrapper={SidebarMenuBadge} className="opacity-0 group-hover/menu-item:opacity-75">
          {item.chord}
        </ChordBadge>
      )}
    </SidebarMenuItem>
  );
}
