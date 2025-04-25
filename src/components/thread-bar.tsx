import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ThreadBarProps {
  count?: number;
  image?: string;
  name?: string;
  timestamp?: number;
  onClick?: () => void;
}

export const ThreadBar = ({
  count,
  image,
  name = 'Member',
  timestamp,
  onClick,
}: ThreadBarProps) => {
  if (!count || !timestamp) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="group group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:border-border hover:bg-white"
      type="button"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="mr-1 size-6 shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
            <Image
              priority
              width={100}
              height={100}
              src="/avatar-placeholder.png"
              alt={name}
              className="h-full w-full object-cover"
            />
          </AvatarFallback>
        </Avatar>
        <span className="truncate font-bold text-sky-700 text-xs hover:underline">
          {count} {count > 1 ? 'replies' : 'reply'}
        </span>
        <span className="block truncate text-muted-foreground text-xs group-hover/thread-bar:hidden">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        <span className="hidden truncate text-muted-foreground text-xs group-hover/thread-bar:block">
          View thread
        </span>
      </div>
      <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition group-hover/thread-bar:opacity-100" />
    </button>
  );
};
