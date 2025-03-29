'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal';

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            disabled={false}
            value=""
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Zephyr', 'Zephara'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
