import { Request, Response, NextFunction } from 'express';
import { logger, BaseError, BadRequestError, NotFoundError, InternalServerError } from '../utils/index';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.stack);

  const response: any = {
    error: {
      status: 'fail',
      message: error.message,
      timestamp: new Date().toISOString(),
    },
  };

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json(response);
  }

  if (error instanceof BadRequestError) {
    response.error.message = error.message;
    return res.status(400).json(response);
  }

  if (error instanceof NotFoundError) {
    response.error.message = error.message;
    return res.status(404).json(response);
  }

  if (error instanceof InternalServerError) {
    response.error.message = error.message;
    return res.status(500).json(response);
  }

  response.error.message = 'An unexpected error occurred';
  return res.status(500).json(response);
};

export default errorMiddleware;
