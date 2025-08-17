import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientInferRequest, ClientInferResponseBody } from '@ts-rest/core';
import { toast } from 'sonner';

import { client } from './apiClient';
import { rootRouter } from '../contract/rootRouter';

type ServerSettingsRouter<T extends keyof typeof rootRouter.api.settings.server> =
  (typeof rootRouter.api.settings.server)[T];

type LogInBody = ClientInferRequest<ServerSettingsRouter<'logInMega'>>['body'];
type LogInResponse = ClientInferResponseBody<ServerSettingsRouter<'logInMega'>>;

type WhoAmIResponse = ClientInferResponseBody<ServerSettingsRouter<'whoAmI'>>;

export const serverSettingsApi = createApi({
  reducerPath: 'serverSettingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'use client directly',
  }),
  tagTypes: ['email'],
  endpoints: (builder) => ({
    login: builder.mutation<LogInResponse, LogInBody>({
      invalidatesTags: ['email'],
      queryFn: (body) =>
        client.api.settings.server.logInMega({ body }).then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to log into Mega');
          throw new Error('Failed to log into Mega');
        }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['email'],
      queryFn: () =>
        client.api.settings.server.logOutMega().then((response) => {
          if (response.status === 200) {
            return { data: undefined };
          }

          toast.error('Failed to log out of Mega');
          throw new Error('Failed to log out of Mega');
        }),
    }),
    whoami: builder.query<WhoAmIResponse, void>({
      providesTags: ['email'],
      queryFn: () =>
        client.api.settings.server.whoAmI().then((response) => {
          if (response.status === 200) {
            return { data: response.body };
          }

          toast.error('Failed to retrieve Mega account information');
          throw new Error('Failed to retrieve Mega account information');
        }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useWhoamiQuery } = serverSettingsApi;
