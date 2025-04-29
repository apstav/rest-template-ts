import { BaseError } from './baseError';

export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}
