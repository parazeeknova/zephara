'use client';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      Loggen In!
      <Button onClick={() => signOut()} variant="outline" className="w-full">
        Sign Out
      </Button>
    </div>
  );
}
