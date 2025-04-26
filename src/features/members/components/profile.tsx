import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useConfirm } from '@/hooks/use-confirm';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { ChevronDownIcon, Loader2, MailIcon } from 'lucide-react';
import { AlertTriangle, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Id } from '../../../../convex/_generated/dataModel';
import { useCurrentMember } from '../api/use-current-member';
import { useGetMember } from '../api/use-get-member';
import { useRemoveMember } from '../api/use-remove-member';
import { useUpdateMember } from '../api/use-update-member';

interface ProfileProps {
  memberId: Id<'members'>;
  onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [LeaveDialog, confirmLeave] = useConfirm(
    'Are you sure you want to leave this workspace?',
    'You will no longer be able to access this workspace.'
  );
  const [RemoveDialog, confirmRemove] = useConfirm(
    'Are you sure you want to remove this member?',
    'This action cannot be undone.'
  );
  const [UpdateDialog, confirmUpdate] = useConfirm(
    'Change role',
    "Are you sure you want to change this member's role?"
  );

  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });
  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({ workspaceId });
  const { mutate: uppdateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const { mutate: removeMember, isPending: isRemovingMember } =
    useRemoveMember();

  const onRemove = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success('Member removed successfully');
          onClose();
        },
        onError: () => {
          toast.error('Failed to remove member');
        },
      }
    );
  };

  const onLeave = async () => {
    const ok = await confirmLeave();
    if (!ok) {
      return;
    }

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          router.replace('/');
          toast.success('You left the workspace');
          onClose();
        },
        onError: () => {
          toast.error('Failed to leave the workspace');
        },
      }
    );
  };

  const onUpdate = async (role: 'admin' | 'member') => {
    const ok = await confirmUpdate();
    if (!ok) {
      return;
    }

    uppdateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          toast.success('Role changed');
          onClose();
        },
        onError: () => {
          toast.error('Failed to change role');
        },
      }
    );
  };

  if (isLoadingMember || isLoadingCurrentMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="font-bold text-lg">Profile</p>
          <Button onClick={onClose} variant="ghost" size="iconSm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="font-bold text-lg">Profile</p>
          <Button onClick={onClose} variant="ghost" size="iconSm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RemoveDialog />
      <LeaveDialog />
      <UpdateDialog />
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="font-bold text-lg">Thread</p>
          <Button onClick={onClose} variant="ghost" size="iconSm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="size-full max-h-[256px] max-w-[256px]">
            <AvatarImage src={member.user.image} />
            <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
              <Image
                priority
                width={512}
                height={512}
                src="/avatar-placeholder.png"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col p-4">
          <p className="font-bold text-xl">{member.user.name}</p>
          {currentMember?.role === 'admin' &&
          currentMember?._id !== memberId ? (
            <div className="mt-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-1/2 capitalize">
                    {member.role} <ChevronDownIcon className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as 'admin' | 'member')
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="w-1/2" onClick={onRemove}>
                Remove
              </Button>
            </div>
            // biome-ignore lint/nursery/noNestedTernary:
          ) : currentMember?._id === memberId &&
            currentMember?.role !== 'admin' ? (
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full capitalize"
                onClick={onLeave}
              >
                Leave
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="mb-4 font-bold text-sm">Contact information</p>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-md bg-muted">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[13px] text-muted-foreground">
                Email Address
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-[#1264a3] text-sm hover:underline"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
