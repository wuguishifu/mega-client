import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import { navigationCommands } from './navigationCommands';
import { Command } from './types';

export function useCommands() {
  const { setTheme } = useTheme();
  const toggleTheme = useCallback(() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark')), [setTheme]);

  return useMemo<Command[]>(
    () => [...navigationCommands, { chord: ['G', 'L'], target: { action: toggleTheme } }],
    [toggleTheme],
  );
}
