import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage =
      typeof message === 'object' && message !== null && 'message' in message
        ? (message as { message: string | string[] }).message
        : String(message);
    const finalMessage = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;

    const apiResponse: ApiResponseDto<null> = {
      statusCode: status,
      data: null,
      message: finalMessage,
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${finalMessage}`,
    );

    response.status(status).json(apiResponse);
  }
}
