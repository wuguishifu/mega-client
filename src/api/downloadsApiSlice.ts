import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientInferRequest, ClientInferResponseBody } from '@ts-rest/core';
import { toast } from 'sonner';

import { client } from './apiClient';
import { rootRouter } from '../contract/rootRouter';

type DownloadsRouter<T extends keyof typeof rootRouter.api.downloads> = (typeof rootRouter.api.downloads)[T];

type ListDownloadsQuery = ClientInferRequest<DownloadsRouter<'listDownloads'>>['query'];
type ListDownloadsResponse = ClientInferResponseBody<DownloadsRouter<'listDownloads'>>;

export const downloadsApi = createApi({
  reducerPath: 'downloadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'use client directly',
  }),
  endpoints: (builder) => ({
    listDownloads: builder.query<ListDownloadsResponse, ListDownloadsQuery>({
      queryFn: (query) =>
        client.api.downloads.listDownloads({ query }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to list downloads');
          throw new Error('Failed to list downloads');
        }),
    }),
  }),
});

export const { useListDownloadsQuery } = downloadsApi;
