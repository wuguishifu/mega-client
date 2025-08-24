import { Folder, HardDriveDownload, ListStart } from 'lucide-react';
import Link from 'next/link';

import { AppBreadcrumbs } from '../../components/layout/AppBreadcrumbs';
import { PageContent, PageHeader, PageWrapper } from '../../components/layout/PageLayout';
import { ChordBadge } from '../../components/menus/ChordBadge';
import { QuickTransferPopover } from '../../components/transfers/QuicktransferPopover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

export default function Home() {
  return (
    <PageWrapper>
      <PageHeader>
        <AppBreadcrumbs>{[{ url: '/', title: 'Home' }]}</AppBreadcrumbs>
      </PageHeader>
      <PageContent>
        <div className="flex flex-row justify-center items-center gap-4 h-full">
          <Link href="/transfers">
            <Card className="hover:scale-110 transition-all duration-300 w-48">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>Transfers</CardTitle>
                <CardDescription className="w-full text-center">Manage your file transfers</CardDescription>
              </CardHeader>
              <CardContent className="w-full items-center flex justify-center">
                <HardDriveDownload className="size-16" strokeWidth={1} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <ChordBadge className="text-sm opacity-50">{['G', 't']}</ChordBadge>
              </CardFooter>
            </Card>
          </Link>
          <QuickTransferPopover>
            <Card className="hover:scale-110 transition-all duration-300 w-48 cursor-pointer">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>Quick Transfer</CardTitle>
                <CardDescription className="w-full text-center">Quickly queue a new file transfer</CardDescription>
              </CardHeader>
              <CardContent className="w-full items-center flex justify-center">
                <ListStart className="size-16" strokeWidth={1} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <ChordBadge className="text-sm opacity-0">{['G', 't']}</ChordBadge>
              </CardFooter>
            </Card>
          </QuickTransferPopover>
          <Link href="/downloads?path=.">
            <Card className="hover:scale-110 transition-all duration-300 w-48">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>Downloads</CardTitle>
                <CardDescription className="w-full text-center">Manage your downloaded files</CardDescription>
              </CardHeader>
              <CardContent className="w-full items-center flex justify-center">
                <Folder className="size-16" strokeWidth={1} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <ChordBadge className="text-sm opacity-50">{['G', 'd']}</ChordBadge>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </PageContent>
    </PageWrapper>
  );
}
