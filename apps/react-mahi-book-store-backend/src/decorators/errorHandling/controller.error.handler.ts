import {
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    ForbiddenException,
    ConflictException
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorHandlingOptions, BaseHandleError } from './base.error.handler';
import { formatError } from '../../util/error-formatter.util';

/**
 * (SRP) Wraps the controller method response in a BaseApiResponseDto to enforce consistent response formatting for fail cases.
 */
export function HandleControllerError(options?: ErrorHandlingOptions) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      target.prototype.handleSpecificError = function (error: Error, operation: string) {
        switch (true) {
          case error instanceof BadRequestException:
            throw new BadRequestException(error.message);
          case error instanceof UnauthorizedException:
            throw new UnauthorizedException(error.message);
          case error instanceof ForbiddenException:
            throw new ForbiddenException(error.message);
          case error instanceof ConflictException:
            throw new ConflictException(error.message);
          default:
            throw new InternalServerErrorException(error.message);
        }
      };
  
      BaseHandleError(options)(target, propertyKey, descriptor);
    };
  }