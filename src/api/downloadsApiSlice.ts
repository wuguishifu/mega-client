import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientInferRequest, ClientInferResponseBody } from '@ts-rest/core';
import { toast } from 'sonner';

import { client } from './apiClient';
import { rootRouter } from '../contract/rootRouter';

type DownloadsRouter<T extends keyof typeof rootRouter.api.downloads> = (typeof rootRouter.api.downloads)[T];

type ListDownloadsQuery = ClientInferRequest<DownloadsRouter<'listDownloads'>>['query'];
type ListDownloadsResponse = ClientInferResponseBody<DownloadsRouter<'listDownloads'>>;

type RenameItemBody = ClientInferRequest<DownloadsRouter<'renameItem'>>['body'];
type RenameItemResponse = ClientInferResponseBody<DownloadsRouter<'renameItem'>>;

type DeleteItemBody = ClientInferRequest<DownloadsRouter<'deleteItem'>>['body'];
type DeleteItemResponse = ClientInferResponseBody<DownloadsRouter<'deleteItem'>>;

export const downloadsApi = createApi({
  reducerPath: 'downloadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'use client directly',
  }),
  tagTypes: ['Download'],
  endpoints: (builder) => ({
    listDownloads: builder.query<ListDownloadsResponse, ListDownloadsQuery>({
      keepUnusedDataFor: 60,
      queryFn: (query) =>
        client.api.downloads.listDownloads({ query }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to list downloads');
          throw new Error('Failed to list downloads');
        }),
      providesTags: (_, __, arg) => [
        { type: 'Download', id: arg.path || '/' },
        { type: 'Download', id: 'LIST' },
      ],
    }),
    renameItem: builder.mutation<RenameItemResponse, RenameItemBody>({
      queryFn: (body) =>
        client.api.downloads.renameItem({ body }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to rename item');
          throw new Error('Failed to rename item');
        }),
      invalidatesTags(result, _, arg) {
        if (result?.renamed) {
          const path = arg.oldPath.substring(0, arg.oldPath.lastIndexOf('/')) || '/';
          return [{ type: 'Download', id: path }];
        }

        return [];
      },
    }),
    deleteItem: builder.mutation<DeleteItemResponse, DeleteItemBody>({
      queryFn: (body) =>
        client.api.downloads.deleteItem({ body }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to delete item');
          throw new Error('Failed to delete item');
        }),
      invalidatesTags(result, _, arg) {
        if (result?.deleted) {
          const path = arg.path;
          return [{ type: 'Download', id: path }];
        }

        return [];
      },
    }),
  }),
});

export const { useListDownloadsQuery, useRenameItemMutation, useDeleteItemMutation } = downloadsApi;
