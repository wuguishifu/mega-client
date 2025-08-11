import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientInferRequest, ClientInferResponseBody } from '@ts-rest/core';
import { toast } from 'sonner';

import { client } from './apiClient';
import { rootRouter } from '../contract/rootRouter';

type TransfersRouter<T extends keyof typeof rootRouter.api.transfers> = (typeof rootRouter.api.transfers)[T];

type GetTransfersResponse = ClientInferResponseBody<TransfersRouter<'getTransfers'>>;

type CancelTransferParams = ClientInferRequest<TransfersRouter<'cancelTransfer'>>['params'];
type CancelTransferResponse = ClientInferResponseBody<TransfersRouter<'cancelTransfer'>>;

type PauseTransferParams = ClientInferRequest<TransfersRouter<'pauseTransfer'>>['params'];
type PauseTransferResponse = ClientInferResponseBody<TransfersRouter<'pauseTransfer'>>;

type ResumeTransferParams = ClientInferRequest<TransfersRouter<'resumeTransfer'>>['params'];
type ResumeTransferResponse = ClientInferResponseBody<TransfersRouter<'resumeTransfer'>>;

export const transfersApi = createApi({
  reducerPath: 'transfersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'use client directly',
  }),
  tagTypes: ['transfers'],
  endpoints: (builder) => ({
    getTransfers: builder.query<GetTransfersResponse, void>({
      providesTags: ['transfers'],
      queryFn: () =>
        client.api.transfers.getTransfers().then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to get transfers');
          throw new Error('Failed to get transfers');
        }),
    }),
    cancelTransfer: builder.mutation<CancelTransferResponse, CancelTransferParams>({
      invalidatesTags: ['transfers'],
      queryFn: (params) =>
        client.api.transfers.cancelTransfer({ params }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to cancel transfer');
          throw new Error('Failed to cancel transfer');
        }),
    }),
    pauseTransfer: builder.mutation<PauseTransferResponse, PauseTransferParams>({
      invalidatesTags: ['transfers'],
      queryFn: (params) =>
        client.api.transfers.pauseTransfer({ params }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to pause transfer');
          throw new Error('Failed to pause transfer');
        }),
    }),
    resumeTransfer: builder.mutation<ResumeTransferResponse, ResumeTransferParams>({
      invalidatesTags: ['transfers'],
      queryFn: (params) =>
        client.api.transfers.resumeTransfer({ params }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to resume transfer');
          throw new Error('Failed to resume transfer');
        }),
    }),
  }),
});

export const { useGetTransfersQuery } = transfersApi;
