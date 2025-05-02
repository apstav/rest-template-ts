import { BaseError } from './baseError';

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized Access') {
    super(message, 401);
  }
}
