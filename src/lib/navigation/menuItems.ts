import { HardDriveDownload, Home, LucideIcon } from 'lucide-react';

import { Chord, NavigationCommand } from '../../components/commands/types';

export type NavigationMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  chord: Chord;
};

export const mainNavigationItems: NavigationMenuItem[] = [
  { title: 'Home', url: '/', icon: Home, chord: ['G', 'm'] },
  { title: 'Transfers', url: '/transfers', icon: HardDriveDownload, chord: ['G', 'e'] },
];

export const navigationCommands: NavigationCommand[] = mainNavigationItems.map((item) => ({
  chord: item.chord,
  target: { url: item.url },
}));
