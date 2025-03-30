import { UserButton } from '@/features/auth/components/user-button';
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarButton } from './sidebar-button';
import { WorkspaceSwitcher } from './workspace-switcher';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[60px] flex-col items-center gap-y-4 bg-[#481349] pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes('/workspace')}
      />
      <SidebarButton
        icon={MessagesSquare}
        label="Dms"
        isActive={pathname.includes('/messages')}
      />
      <SidebarButton
        icon={Bell}
        label="Activity"
        isActive={pathname.includes('/notifications')}
      />
      <SidebarButton
        icon={MoreHorizontal}
        label="More"
        isActive={pathname.includes('/more')}
      />
      <div className="felx-col mt-auto flex items-center justify-center gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
