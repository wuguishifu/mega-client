import './globals.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { CommandMenu } from '@/components/commands/CommandMenu';
import { CommandPaletteListener } from '@/components/commands/CommandPaletteListener';
import { AppSidebar } from '@/components/menus/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ReduxProvider } from '@/state/provider';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mega Client',
  description: 'Hostable client for Mega',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookiesStore = await cookies();
  const defaultOpen = cookiesStore.get('sidebar-open')?.value === 'true';

  return (
    // Need to use `suppressHydrationWarning` to avoid hydration errors with the ThemeProvider
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    <html lang="en" suppressHydrationWarning>
      <body className={cn(nunito.variable, 'antialiased min-h-screen w-full')}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster richColors />
            <SidebarProvider defaultOpen={defaultOpen}>
              <CommandPaletteListener />
              <CommandMenu />
              <AppSidebar />
              <div className="overflow-x-hidden w-full">{children}</div>
            </SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
