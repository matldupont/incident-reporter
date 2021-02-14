import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError } from 'express-validator';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Something went wrong.', err?.message);
  res.status(400).send({
    message: `${err?.message || 'Something went wrong.'}`,
  });
};
