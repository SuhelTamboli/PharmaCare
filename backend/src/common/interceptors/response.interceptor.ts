import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponseDto<T>> {
    const request = context.switchToHttp().getRequest();
    const statusCode =
      request.method === 'POST' ? 201 : 200;

    return next.handle().pipe(
      map((handlerResponse) => {
        if (
          handlerResponse &&
          typeof handlerResponse === 'object' &&
          'data' in handlerResponse &&
          'message' in handlerResponse &&
          !('statusCode' in handlerResponse)
        ) {
          return {
            statusCode,
            data: (handlerResponse as { data: T }).data,
            message: (handlerResponse as { message: string }).message,
          };
        }
        return {
          statusCode,
          data: handlerResponse as T,
          message: 'Operation completed successfully',
        };
      }),
    );
  }
}
