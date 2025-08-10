import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import { Command } from './types';
import { useIsMobile } from '../../hooks/use-mobile';
import { navigationCommands } from '../../lib/navigation/navigationItems';
import { useSidebar } from '../ui/sidebar';

export function useCommands() {
  const { setTheme } = useTheme();
  const toggleTheme = useCallback(() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark')), [setTheme]);

  const { setOpen, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
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
