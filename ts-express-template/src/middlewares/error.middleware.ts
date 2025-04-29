import { Request, Response, NextFunction } from 'express';
import { logger, BaseError } from '../utils/index';  

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
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

  
  if ((error as any).name === 'ValidationError') {
    response.error.details = Object.values((error as any).errors).map((err: any) => ({
      field: err.path,
      message: err.message,
    }));
    return res.status(400).json(response);
  }

  
  if ((error as any).code === 11000) {
    response.error.message = 'Duplicate key error';
    response.error.details = (error as any).keyValue;
    return res.status(409).json(response);
  }

  
  if ((error as any).name === 'CastError') {
    response.error.message = `Invalid ${ (error as any).path }: ${(error as any).value}`;
    return res.status(400).json(response);
  }

  
  response.error.message = error.message || 'Internal Server Error';
  return res.status(500).json(response);
};

export default errorMiddleware;
