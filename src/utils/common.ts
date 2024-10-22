import { logger } from './logger';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NODE_ENV } from '../config';
import mongoose from 'mongoose';
export function logError(req: Request, statusCode: number, message: string) {
  logger.error(`[${req.method}] [${req.ip}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`);
}

export function logInfo(req: Request | any, statusCode: number, message: string, data: any = {}) {
  logger.info(
    `[${req?.method}] [${req?.ip}] 
    ${req?.path} >> StatusCode:: ${statusCode}, Message:: ${message} Data:: ${JSON.stringify(data)}`,
  );
  // logger.info(
  //   `{
  //     method : ${req.method},
  //     ip : ${req.ip},
  //     path : ${req.path},
  //     statusCode : ${statusCode},
  //     message : ${message},
  //     data : ${JSON.stringify(data)
  //   }`,
  // );
}
export function getdate() {
  var currentdate = new Date();
  var datetime = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
  return datetime;
}


export function DataResponse(
  req: Request,
  res: Response,
  statusCode: number = 200,
  message: string = 'success',
  data?: Object,
  params?: Object,
  pagination?: Object,
) {
  if (NODE_ENV == 'production') {
    logInfo(req, res.statusCode, message, data);
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message.toLowerCase(),
      pagination,
      data,
    });
  } else {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message.toLowerCase(),
      params,
      pagination,
      data,
    });
  }
}
const EXPIRETIME = 86400;

export const BAD_REQUEST = '400_BAD_REQUEST';

export function ErrorResponse(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({
    error: {
      message: message.toLowerCase(),
    },
  });
}

export function ErrorValidations(res: Response, req: Request, code: number) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // if (NODE_ENV == 'development') {
    //   logError(
    //     req,
    //     code,
    //     JSON.stringify({
    //       message: 'Please Fill All Details Correctly',
    //       errors: errors.array(),
    //     }),
    //   );
    // }
    return res.status(code).json({
      error: {
        message: 'Please Fill All Details Correctly',
        errors: errors.array(),
      },
    });
  }
}

export function CheckErrors(req: Request) {

  const errors = validationResult(req);
  consoleLog("errHHHHHHH---",errors)
  if (!errors.isEmpty()) {
    return true;
  } else {
    return false;
  }
}

export function consoleLog(messageOrData: any, data?: any, convertToString: boolean = true): void {
  try {
    const isConsoleDisabled = process?.env?.DISABLE_CONSOLE?.toUpperCase() == 'TRUE';
    if (isConsoleDisabled) {
      return;
    }
    // Extract caller information from the stack trace
    const stack = new Error().stack;
    let callerInfo = '';
    if (stack) {
      const stackLines = stack.split('\n');
      // The 3rd line in the stack trace usually contains the caller info
      if (stackLines.length > 2) {
        callerInfo = stackLines[2].trim();
      }
    }
    // If only one argument is provided, assume it is the data
    if (data === undefined) {
      data = messageOrData;
      messageOrData = '';
    }

    const message = messageOrData ? `${messageOrData} => ` : `\n ${callerInfo} => `;
    const output = convertToString
      ? data instanceof Map
        ? JSON.stringify(Array.from(data.entries()))
        : JSON.stringify(data)
      : data;
    if (typeof output == 'string') {
      console.log(`\n ${message}${output}`);
    } else {
      if (message) {
        console.log(`\n ${message}`, output);
      } else {
        console.log(output);
      }
    }
  } catch (error) {
    console.log('error in console log => ', error?.message ? error?.message : error);
  }
}

export const ObjectId = (id: string) => new mongoose.Types.ObjectId(id);
