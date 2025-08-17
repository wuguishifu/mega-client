import { Cog, Database, HardDriveDownload, Home, LucideIcon, UserRound } from 'lucide-react';

import { Chord, NavigationCommand } from '../../components/commands/types';

export type NavigationMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  chord: Chord;
  hideFromSidebar?: boolean;
};

export const mainNavigationItems: NavigationMenuItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
    chord: ['G', 'm'],
  },
  {
    title: 'Transfers',
    url: '/transfers',
    icon: HardDriveDownload,
    chord: ['G', 't'],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Cog,
    chord: ['G', 's'],
  },
  {
    title: 'User Settings',
    url: '/settings/user',
    icon: UserRound,
    chord: ['G', 'u'],
    hideFromSidebar: true,
  },
  {
    title: 'Server Settings',
    url: '/settings/server',
    icon: Database,
    chord: ['G', 'r'],
    hideFromSidebar: true,
  },
];

export const navigationCommands: NavigationCommand[] = mainNavigationItems.map((item) => ({
  chord: item.chord,
  target: { url: item.url },
}));
