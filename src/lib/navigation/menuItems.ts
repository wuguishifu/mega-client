import { Cog, Database, Folder, HardDriveDownload, Home, LucideIcon, UserRound } from 'lucide-react';

import { Chord, NavigationCommand } from '../../components/commands/types';

export type NavigationMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  chord: Chord;
  hideFromSidebar?: boolean;
  section: 'general' | 'transfers';
};

export const mainNavigationItems: NavigationMenuItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
    chord: ['G', 'm'],
    section: 'general',
  },
  {
    title: 'Transfers',
    url: '/transfers',
    icon: HardDriveDownload,
    chord: ['G', 't'],
    section: 'transfers',
  },
  {
    title: 'Downloads',
    url: '/downloads?path=.',
    icon: Folder,
    chord: ['G', 'd'],
    section: 'transfers',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Cog,
    chord: ['G', 's'],
    section: 'general',
  },
  {
    title: 'User Settings',
    url: '/settings/user',
    icon: UserRound,
    chord: ['G', 'u'],
    hideFromSidebar: true,
    section: 'general',
  },
  {
    title: 'Server Settings',
    url: '/settings/server',
    icon: Database,
    chord: ['G', 'r'],
    hideFromSidebar: true,
    section: 'general',
  },
];

export const navigationCommands: NavigationCommand[] = mainNavigationItems.map((item) => ({
  chord: item.chord,
  target: { url: item.url },
}));
