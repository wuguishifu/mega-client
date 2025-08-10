import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { ChordBadge } from './ChordBadge';
import { navigationChordMap } from '../commands/navigationCommands';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavigationItem({ item }: { item: NavigationItem }) {
  const chord = navigationChordMap[item.url];

  return (
    <SidebarMenuItem className="group/menu-item">
      <SidebarMenuButton asChild>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {chord && <ChordBadge>{chord}</ChordBadge>}
    </SidebarMenuItem>
  );
}
