import { useRemoveMessage } from '@/features/messages/api/use-remove-message';
import { useUpdateMessage } from '@/features/messages/api/use-update-message';
import { useToggleReaction } from '@/features/reactions/api/use-toggle-reactions';
import { useConfirm } from '@/hooks/use-confirm';
import { usePanel } from '@/hooks/use-panel';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { toast } from 'sonner';
import type { Doc, Id } from '../../convex/_generated/dataModel';
import { Hint } from './hint';
import { Reactions } from './reactions';
import { Thumbnail } from './thumbnail';
import { Toolbar } from './toolbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Renderer = dynamic(() => import('@/components/renderer'), { ssr: false });
const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

interface MessageProps {
  id: Id<'messages'>;
  memberId: Id<'members'>;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number;
      memberIds: Id<'members'>[];
    }
  >;
  body: Doc<'messages'>['body'];
  image: string | null | undefined;
  createdAt: Doc<'messages'>['_creationTime'];
  updatedAt: Doc<'messages'>['updatedAt'];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<'messages'> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
}

const formatFullTime = (date: Date) => {
  return `${
    isToday(date)
      ? 'Today'
      : // biome-ignore lint/nursery/noNestedTernary:
        isYesterday(date)
        ? 'Yesterday'
        : format(date, 'MMM dd, yyyy')
  } at ${format(date, 'hh:mm:ss a')}`;
};

export const Message = ({
  id,
  isAuthor,
  memberId,
  authorImage,
  authorName = 'Member',
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageProps) => {
  const { parentMessageId, onOpenMessage, onClose } = usePanel();

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Message',
    'Are you sure you want to delete this message? This action cannot be undone.'
  );

  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();
  const { mutate: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();
  const { mutate: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction();

  const isPending = isUpdatingMessage;

  const handleReaction = (value: string) => {
    toggleReaction(
      { messageId: id, value },
      {
        onError: () => {
          toast.error('Failed to add reaction');
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success('Message deleted successfully');
          if (parentMessageId === id) {
            onClose();
          }
        },
        onError: () => {
          toast.error('Failed to delete message');
        },
      }
    );
  };

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success('Message updated successfully');
          setEditingId(null);
        },
        onError: () => {
          toast.error('Failed to update message');
        },
      }
    );
  };

  if (isCompact) {
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            'group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60',
            isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
            isRemovingMessage &&
              'origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200'
          )}
        >
          <div className="flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button
                type="button"
                className="w-[33px] text-center text-muted-foreground text-xs leading-[20px] opacity-0 hover:underline group-hover:opacity-100"
              >
                {format(new Date(createdAt), 'hh:mm')}
              </button>
            </Hint>
            {isEditing ? (
              <div className="h-full w-full">
                <Editor
                  onSubmit={handleUpdate}
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  varient="update"
                />
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <Renderer value={body} />
                <Thumbnail url={image} />
                {updatedAt ? (
                  <span className="text-muted-foreground text-xs">
                    (edited)
                  </span>
                ) : null}
                <Reactions data={reactions} onChange={handleReaction} />
              </div>
            )}
          </div>
          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleRemove}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          'group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60',
          isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
          isRemovingMessage &&
            'origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200'
        )}
      >
        <div className="flex items-start gap-2">
          <button type="button">
            <Avatar>
              <AvatarImage src={authorImage} />
              <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
                <Image
                  priority
                  width={100}
                  height={100}
                  src="/avatar-placeholder.png"
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="h-full w-full">
              <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                varient="update"
              />
            </div>
          ) : (
            <div className="flex w-full flex-col overflow-hidden">
              <div className="text-sm">
                <button
                  onClick={() => {}}
                  type="button"
                  className="text-bold text-primary hover:underline"
                >
                  {authorName}
                </button>
                <span>&nbsp;&nbsp;</span>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button
                    className="text-muted-foreground text-xs hover:underline"
                    type="button"
                  >
                    {format(new Date(createdAt), 'h:mm a')}
                  </button>
                </Hint>
              </div>
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt ? (
                <span className="text-muted-foreground text-xs">(edited)</span>
              ) : null}
              <Reactions data={reactions} onChange={handleReaction} />
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  );
};
