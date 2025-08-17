import { Database, UserRound } from 'lucide-react';
import Link from 'next/link';

import { AppBreadcrumbs } from '../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../components/layout/PageLayout';
import { ChordBadge } from '../../components/menus/ChordBadge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

const breadcrumbs = [
  { url: '/', title: 'Home' },
  { url: '/settings', title: 'Settings' },
];

export default function Settings() {
  return (
    <PageWrapper>
      <PageHeader>
        <AppBreadcrumbs>{breadcrumbs}</AppBreadcrumbs>
      </PageHeader>
      <PageContent>
        <div className="flex flex-row justify-center items-center gap-4 h-full">
          <Link href="/settings/user">
            <Card className="hover:scale-110 transition-all duration-300 w-48">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>User Settings</CardTitle>
                <CardDescription className="w-full text-center">Manage your user settings</CardDescription>
              </CardHeader>
              <CardContent className="w-full items-center flex justify-center">
                <UserRound className="size-16" strokeWidth={1} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <ChordBadge className="text-sm opacity-50">{['G', 'u']}</ChordBadge>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/settings/server">
            <Card className="hover:scale-110 transition-all duration-300 w-48 cursor-pointer">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>Server Settings</CardTitle>
                <CardDescription className="w-full text-center">Manage the server settings</CardDescription>
              </CardHeader>
              <CardContent className="w-full items-center flex justify-center">
                <Database className="size-16" strokeWidth={1} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <ChordBadge className="text-sm opacity-50">{['G', 'r']}</ChordBadge>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </PageContent>
    </PageWrapper>
  );
}
