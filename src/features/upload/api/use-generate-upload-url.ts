import { useMutation } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';

type ResponseType = string | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useGenerateUploadUrl = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    'success' | 'error' | 'pending' | 'settled' | null
  >(null);

  // const [isPending, setIsPending] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [isSettled, setIsSettled] = useState(true);

  const isPending = useMemo(() => status === 'pending', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isSettled = useMemo(() => status === 'settled', [status]);

  const mutation = useMutation(api.upload.generateUploadUrl);
  const mutate = useCallback(
    // biome-ignore lint/complexity/noBannedTypes:
    async (_values: {}, options?: Options) => {
      try {
        setData(null);
        setError(null);

        // setIsError(false);
        // setIsSettled(false);
        // setIsSuccess(false);
        // setIsPending(true);

        setStatus('pending');

        const response = await mutation();
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus('error');
        options?.onError?.(error as unknown as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        // setIsPending(false);
        // setIsSettled(true);
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
