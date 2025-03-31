import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import type React from 'react';
import { FaCaretDown } from 'react-icons/fa6';
import { useToggle } from 'react-use';

interface WorkspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export const WorkspaceSection = ({
  children,
  label,
  hint,
  onNew,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="mt-3 flex flex-col px-2">
      <div className="group flex items-center px-1.5">
        <Button
          className="size-6 shrink-0 p-0.5 text-[#f9edffcc]"
          variant="transparent"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn('size-4 transition-transform', on && '-rotate-90')}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group h-[28px] items-center justify-start overflow-hidden px-1.5 text-[#f9edffcc] text-sm"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparent"
              size="iconSm"
              className="ml-auto size-6 shrink-0 p-0.5 text-[#f9edffcc] opacity-0 transition-opacity group-hover:opacity-100"
            >
              <PlusIcon className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
