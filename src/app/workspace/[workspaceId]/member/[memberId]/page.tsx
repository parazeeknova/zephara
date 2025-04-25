'use client';

import { useCreateOrGetConversation } from '@/features/conversations/api/use-create-or-get-conversation';
import { useMemberId } from '@/hooks/use-member-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Id } from '../../../../../../convex/_generated/dataModel';
import { Conversation } from './conversation';

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const [conversationId, setConversationId] =
    useState<Id<'conversations'> | null>(null);
  const { data, mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      { memberId, workspaceId },
      {
        onSuccess(data) {
          setConversationId(data);
        },
        onError() {
          toast.error('Error creating conversation');
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          Conversation not found
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
