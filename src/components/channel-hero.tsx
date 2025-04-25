interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mx-5 mt-[88px] mb-4">
      <p className="mb-2 flex items-center font-bold text-2xl"># {name}</p>
      <p className="mb-4 font-normal text-slate-800">
        This channel was created on{' '}
        {new Date(creationTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        . This is the very beginning of the <strong>{name}</strong> channel and
        so yours ✨
      </p>
    </div>
  );
};
