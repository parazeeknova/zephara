import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = 'Member',
  image,
}: ConversationHeroProps) => {
  return (
    <div className="mx-5 mt-[88px] mb-4">
      <div className="mb-2 flex items-center gap-x-1">
        <Avatar className="mr-2 size-14">
          <AvatarImage src={image} />
          <AvatarFallback className="rounded-md bg-gradient-to-br from-gray-200 to-gray-300 font-medium text-foreground dark:from-gray-700 dark:to-gray-800">
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
        <p className="font-bold text-2xl">{name}</p>
      </div>
      <p className="mb-4 font-normal text-slate-800">
        This conversation is just between you and <strong>{name}</strong>
      </p>
    </div>
  );
};
