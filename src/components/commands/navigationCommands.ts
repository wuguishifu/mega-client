import { Chord, NavigationCommand } from './types';

export const navigationChordMap: Record<string, Chord> = {
  '/': ['G', 'm'],
  '/transfers': ['G', 'e'],
};

export const navigationCommands: NavigationCommand[] = Object.entries(navigationChordMap).map(([url, chord]) => ({
  chord,
  target: { url },
}));
