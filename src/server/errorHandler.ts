import { TsRestRequest, TsRestResponse } from '@ts-rest/serverless';

export const errorHandler = (error: unknown, _request: TsRestRequest) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return TsRestResponse.fromJson({ message: 'Server Error' }, { status: 500 });
};
