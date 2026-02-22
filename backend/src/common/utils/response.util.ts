import { HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from '../dto/api-response.dto';

export function successResponse<T>(
  data: T,
  message = 'Operation completed successfully',
  statusCode = HttpStatus.OK,
): ApiResponseDto<T> {
  return {
    statusCode,
    data,
    message,
  };
}

export function errorResponse<T>(
  data: T,
  message: string,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
): ApiResponseDto<T> {
  return {
    statusCode,
    data,
    message,
  };
}
