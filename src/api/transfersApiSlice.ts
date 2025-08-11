import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientInferResponseBody } from '@ts-rest/core';

import { client } from './apiClient';
import { rootRouter } from '../contract/rootRouter';

type TransfersRouter<T extends keyof typeof rootRouter.api.transfers> = (typeof rootRouter.api.transfers)[T];

type GetTransfersResponse = ClientInferResponseBody<TransfersRouter<'getTransfers'>>;

export const transfersApi = createApi({
  reducerPath: 'transfersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'use client directly',
  }),
  endpoints: (builder) => ({
    getTransfers: builder.query<GetTransfersResponse, void>({
      queryFn: () =>
        client.api.transfers.getTransfers().then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          throw new Error('Failed to get transfers');
        }),
    }),
  }),
});

export const { useGetTransfersQuery } = transfersApi;
