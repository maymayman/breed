import { logger } from '@utilities/logger';
import { NextFunction, Request, Response } from "express";

export enum StatusCode {
  NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500,
};

export enum ErrorCode {
  API_NOT_FOUND = 4000,
  ENTITY_NOT_FOUND = 4001,
  INTERNAL_SERVER_ERROR = 5000,
  
};

export const ErrorMessage = {
  [ErrorCode.API_NOT_FOUND]: 'API Not Found',
  [ErrorCode.ENTITY_NOT_FOUND]: 'Entity Not Found',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

export const ErrorMessages = {
  [ErrorCode.API_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: ErrorMessage[ErrorCode.API_NOT_FOUND],
    errorCode: ErrorCode.API_NOT_FOUND
  },

  [ErrorCode.ENTITY_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: ErrorMessage[ErrorCode.API_NOT_FOUND],
    errorCode: ErrorCode.API_NOT_FOUND
  },

  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    message: ErrorMessage[ErrorCode.INTERNAL_SERVER_ERROR],
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR
  },
};

export class BaseError extends Error {
  public status: StatusCode;
  public code: ErrorCode;
  public message: string;
  constructor(
    code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    message?: string
  ) {
    const errorMessages= ErrorMessages[code];
    const messageErr = message || errorMessages.message;
    super(messageErr);

    this.status = errorMessages.statusCode;
    this.code = errorMessages.errorCode;

    Error.captureStackTrace(this);
  }
}

class ErrorController {
  private async notificationError(req: Request, res: Response, err: any): Promise<void> {
    const method = req.method;
    const baseUrl = req.baseUrl;
    const input = method === 'get' ? req.query : req.body;
    logger.error(`Error ${err.message}`, { method, baseUrl, input, stack : err.stack });
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public handleError = (fn: Function) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      logger.error(error.message, { stack : error.stack });
      this.notificationError(req, res, error);
      const err = (error instanceof BaseError) 
        ? error
        : new BaseError(
          ErrorCode.INTERNAL_SERVER_ERROR,
          error.message,
        );
  
      next(err);
    });
  }
}

export const errorController = new ErrorController();