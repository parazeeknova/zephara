import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) {
    return null;
  }

  return (
    <Dialog>
      <DialogTitle hidden>Chat Image</DialogTitle>
      <DialogTrigger>
        <div className="relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden rounded-lg border">
          {/* biome-ignore lint/nursery/noImgElement: */}
          <img
            src={url}
            alt="chat glimph"
            className="size-full rounded-md object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        {/* biome-ignore lint/nursery/noImgElement: */}
        <img
          src={url}
          alt="chat glimph"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  );
};
