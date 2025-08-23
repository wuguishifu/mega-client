import './globals.css';

import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';
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

import { Button } from '../components/ui/button';

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(nunito.variable, 'antialiased min-h-screen w-full')}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster richColors />
            <SignedOut>
              <div className="w-full h-screen flex items-center justify-center">
                <Button asChild className="cursor-pointer w-40">
                  <SignInButton>
                    <div>
                      <LogIn />
                      <span>Sign In</span>
                    </div>
                  </SignInButton>
                </Button>
              </div>
            </SignedOut>
            <SignedIn>
              <SidebarProvider defaultOpen={defaultOpen}>
                <ReduxProvider>
                  <CommandPaletteListener />
                  <CommandMenu />
                  <AppSidebar />
                  <div className="overflow-x-hidden w-full">{children}</div>
                </ReduxProvider>
              </SidebarProvider>
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
