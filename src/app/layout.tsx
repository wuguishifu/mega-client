import './globals.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

import { AppSidebar } from '../components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';

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
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
