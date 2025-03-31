import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

const sidebarItemVarients = cva(
  'flex h-7 items-center justify-start gap-1.5 overflow-hidden px-[18px] font-normal text-sm',
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

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  varient?: VariantProps<typeof sidebarItemVarients>['variant'];
}

export const SidebarItem = ({
  label,
  id,
  icon: Icon,
  varient,
}: SidebarItemProps) => {
  const workspaceID = useWorkspaceId();

  return (
    <Button
      asChild
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVarients({ variant: varient }))}
    >
      <Link href={`/workspace/${workspaceID}/channel/${id}`}>
        <Icon className="mr-1 size-3.5 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};
