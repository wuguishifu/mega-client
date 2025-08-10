import './globals.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

import { CommandMenu } from '../components/commands/CommandMenu';
import { CommandPaletteListener } from '../components/commands/CommandPaletteListener';
import { AppSidebar } from '../components/menus/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mega Client',
  description: 'Hostable client for Mega',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const defaultOpen = cookiesStore.get('sidebar-open')?.value === 'true';

  return (
    // Need to use `suppressHydrationWarning` to avoid hydration errors with the ThemeProvider
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    <html lang="en" suppressHydrationWarning>
      <body className={cn(nunito.variable, 'antialiased min-h-screen w-full')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster richColors />
          <CommandMenu />
          <CommandPaletteListener />
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <span>Shortcut: Command + B</span>
              </TooltipContent>
            </Tooltip>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
