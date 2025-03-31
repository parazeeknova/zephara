'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthActions } from '@convex-dev/auth/react';
import { motion } from 'framer-motion';
import { Loader2, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useCurrentUser } from '../api/use-current-user';

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background p-[2px] shadow-md">
        <Loader2 className="size-5 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="group relative outline-none">
        <div className="relative">
          <div className="-inset-0.5 absolute rounded-full bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 blur-sm transition duration-200 group-hover:opacity-75 dark:from-gray-200 dark:to-white" />
          <Avatar className="relative size-10 rounded-md border-2 border-background shadow-md">
            <AvatarImage
              alt={name}
              src={image}
              className="rounded-md object-cover"
            />
            <AvatarFallback className="rounded-md bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
              <Image
                priority
                width={100}
                height={100}
                src="/avatar-placeholder.png"
                alt="Avatar"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.textContent =
                      avatarFallback || '';
                  }
                }}
              />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="right"
        className="w-60 p-2 shadow-lg"
      >
        <DropdownMenuItem
          onClick={signOut}
          className="group cursor-pointer transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
        >
          <motion.div
            className="mr-2"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <LogOut className="size-4" />
          </motion.div>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
