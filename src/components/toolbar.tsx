import { MessageSquareTextIcon, PencilIcon, Smile, Trash2 } from 'lucide-react';
import { EmojiPopover } from './emoji-popover';
import { Hint } from './hint';
import { Button } from './ui/button';

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (emoji: string) => void;
  hideThreadButton?: boolean;
}

export const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleThread,
  handleReaction,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="rounded-md border bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <EmojiPopover
          hint="Add reaction"
          // @ts-expect-error
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant="ghost" disabled={isPending} size="iconSm">
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              variant="ghost"
              disabled={isPending}
              size="iconSm"
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Edit message">
            <Button
              variant="ghost"
              disabled={isPending}
              size="iconSm"
              onClick={handleEdit}
            >
              <PencilIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Delete message">
            <Button
              variant="ghost"
              disabled={isPending}
              size="iconSm"
              onClick={handleDelete}
            >
              <Trash2 className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};
