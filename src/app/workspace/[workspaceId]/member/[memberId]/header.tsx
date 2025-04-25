import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa6';

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?: () => void;
}

export const Header = ({
  memberImage,
  onClick,
  memberName = 'Member',
}: HeaderProps) => {
  return (
    <div className="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
      <Button
        variant="ghost"
        className="w-auto overflow-hidden px-2 font-semibold text-lg"
        size="sm"
        onClick={onClick}
      >
        <Avatar className="mr-1 size-5">
          <AvatarImage src={memberImage} />
          <AvatarFallback className="rounded-md bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
            <Image
              priority
              width={100}
              height={100}
              src="/avatar-placeholder.png"
              alt={memberName}
              className="h-full w-full object-cover"
            />
          </AvatarFallback>
        </Avatar>
        <span className="truncate">{memberName}</span>
        <FaChevronDown className="ml-2 size-2.5" />
      </Button>
    </div>
  );
};
