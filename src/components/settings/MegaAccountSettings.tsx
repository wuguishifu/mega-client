'use client';

import { MegaLogInPopOver } from './MegaLogInPopOver';
import { useWhoamiQuery } from '../../api/serverSettingsApiSlice';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function MegaAccountSettings() {
  const { data, isLoading } = useWhoamiQuery();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Mega Account</CardTitle>
        {isLoading ? (
          <CardDescription>Loading...</CardDescription>
        ) : (
          <CardDescription>
            <p>Logged in: {data?.loggedIn ? 'Yes' : 'No'}</p>
            {data?.email && <p>Email: {data?.email}</p>}
          </CardDescription>
        )}
      </CardHeader>
      {isLoading ? null : (
        <CardContent>
          {data?.loggedIn ? (
            <Button variant="secondary" className="cursor-pointer">
              Log Out
            </Button>
          ) : (
            <MegaLogInPopOver asChild>
              <Button variant="default" className="cursor-pointer">
                Log In
              </Button>
            </MegaLogInPopOver>
          )}
        </CardContent>
      )}
    </Card>
  );
}
