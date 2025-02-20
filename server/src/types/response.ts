export type SuccessResponse<T = void> = {
  statusCode: number;
  success: true;
  message?: string;
} & (T extends void ? {} : { data: T });
