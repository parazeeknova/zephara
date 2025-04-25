import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import type { Id } from '../../../../convex/_generated/dataModel';

const userItemVarients = cva(
  'flex h-7 items-center justify-start gap-1.5 overflow-hidden px-4 font-normal text-sm',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'bg-white/90 text-[#481349] hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface UserItemProps {
  id: Id<'members'>;
  label?: string;
  image?: string;
  varient?: VariantProps<typeof userItemVarients>['variant'];
}

export const UserItem = ({
  id,
  label = 'Member',
  image,
  varient,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      className={cn(userItemVarients({ variant: varient }))}
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="mr-1 size-5">
          <AvatarImage src={image} />
          <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
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
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};
