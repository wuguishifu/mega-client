import { useLogoutMutation } from '../../api/serverSettingsApiSlice';
import { Button } from '../ui/button';

export function MegaLogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <Button variant="secondary" className="cursor-pointer" onClick={() => logout()} disabled={isLoading}>
      Log Out
    </Button>
  );
}
