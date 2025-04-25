import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { MdOutlineAddReaction } from 'react-icons/md';
import type { Doc, Id } from '../../convex/_generated/dataModel';
import { EmojiPopover } from './emoji-popover';
import { Hint } from './hint';

interface ReactionProps {
  data: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number;
      memberIds: Id<'members'>[];
    }
  >;
  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) {
    return null;
  }
  return (
    <div className="mt-1 mb-1 flex items-center gap-1">
      {data.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${reaction.count === 1 ? 'person' : 'people'} reacted with ${reaction.value}`}
        >
          <button
            onClick={() => onChange(reaction.value)}
            type="button"
            className={cn(
              'flex h-7 cursor-pointer items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-2 text-slate-800',
              reaction.memberIds.includes(currentMemberId) &&
                'border-blue-500 bg-blue-100/70 text-white'
            )}
          >
            {reaction.value}
            <span
              className={cn(
                'font-semibold text-muted-foreground text-xs',
                reaction.memberIds.includes(currentMemberId) && 'text-blue-500'
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add reaction"
        // @ts-expect-error
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button
          type="button"
          className="flex h-7 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-3 text-slate-800 hover:border-slate-500"
        >
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};
