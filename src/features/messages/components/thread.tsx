import { Message } from '@/components/message';
import { Button } from '@/components/ui/button';
import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { AlertTriangle, Loader2, XIcon } from 'lucide-react';
import { useState } from 'react';
import type { Id } from '../../../../convex/_generated/dataModel';
import { useGetMessage } from '../api/use-get-message';

interface ThreadProps {
  messageId: Id<'messages'>;
  onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
  const workspaceId = useWorkspaceId();
  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null);

  const { data: currentMember } = useCurrentMember({ workspaceId });
  const { data: message, isLoading: loadingMessage } = useGetMessage({
    id: messageId,
  });

  if (loadingMessage) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="font-bold text-lg">Thread</p>
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

  if (!message) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="font-bold text-lg">Thread</p>
          <Button onClick={onClose} variant="ghost" size="iconSm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Message not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="font-bold text-lg">Thread</p>
        <Button onClick={onClose} variant="ghost" size="iconSm">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <Message
        hideThreadButton
        memberId={message.memberId}
        authorImage={message.user.image}
        isAuthor={message.memberId === currentMember?._id}
        body={message.body}
        image={message.image}
        createdAt={message._creationTime}
        updatedAt={message.updatedAt}
        id={message._id}
        reactions={message.reactions}
        isEditing={editingId === message._id}
        setEditingId={setEditingId}
      />
    </div>
  );
};
