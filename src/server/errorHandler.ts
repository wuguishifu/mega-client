import { TsRestRequest, TsRestResponse } from '@ts-rest/serverless';

export const errorHandler = (error: unknown, _request: TsRestRequest) => {
  console.error(error);
  return TsRestResponse.fromJson({ message: 'Server Error' }, { status: 500 });
};
