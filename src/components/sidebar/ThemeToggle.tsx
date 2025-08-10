'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))}
        className="cursor-pointer"
      >
        <Moon className="opacity-80 block dark:hidden" size={20} />
        <Sun className="opacity-80 hidden dark:block" size={20} />
        <span className="block dark:hidden">Dark Mode</span>
        <span className="hidden dark:block">Light Mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
