'use client';

import { initClient, tsRestFetchApi } from '@ts-rest/core';

import { rootRouter } from '../contract/rootRouter';

export const client = initClient(rootRouter, {
  // no base URL because we use next.js app router /api/*
  baseUrl: '',
  baseHeaders: {},
  jsonQuery: true,
  api: (args) => {
    return tsRestFetchApi(args);
  },
});
