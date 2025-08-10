import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import { Command } from './types';
import { navigationCommands } from '../../lib/navigation/menuItems';
import { useSidebar } from '../ui/sidebar';

export function useCommands() {
  const { setTheme } = useTheme();
  const toggleTheme = useCallback(() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark')), [setTheme]);

  const { isMobile, setOpen, setOpenMobile } = useSidebar();
  const toggleSidebar = useCallback(
    () => (isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o)),
    [isMobile, setOpen, setOpenMobile],
  );

  return useMemo<Command[]>(
    () => [
      ...navigationCommands,
      { chord: ['G', 'L'], target: { action: toggleTheme } },
      { chord: ['G', 'b'], target: { action: toggleSidebar } },
    ],
    [toggleTheme, toggleSidebar],
  );
}
