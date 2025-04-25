import { useParams } from 'next/navigation';
import type { Id } from '../../convex/_generated/dataModel';

export const useMemberId = () => {
  const params = useParams();
  return params.memberId as Id<'members'>;
};
