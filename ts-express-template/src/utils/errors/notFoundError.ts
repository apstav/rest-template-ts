import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}
