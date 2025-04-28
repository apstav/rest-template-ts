import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);  // 404 status for not found
  }
}
