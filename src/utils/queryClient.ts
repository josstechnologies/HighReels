import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2, staleTime: __DEV__ ? 0 : 1000 * 60 * 10}},
});
