import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';
import { RESPONSE_MESSAGE_KEY } from './response.decorator';
import { Reflector } from '@nestjs/core';

export interface NormalizedResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, NormalizedResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<NormalizedResponse<T>> {
    return next.handle().pipe(
      map((data: T): NormalizedResponse<T> => {
        const response = context.switchToHttp().getResponse<ExpressResponse>();
        return {
          statusCode: response.statusCode,
          message: this.reflector.get<string>(
            RESPONSE_MESSAGE_KEY,
            context.getHandler(),
          ),
          data,
        };
      }),
    );
  }
}
