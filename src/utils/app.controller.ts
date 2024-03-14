import { Response } from 'express';
import HttpStatusCode from './HTTPStatusCode';
import config from '../configs/config';

interface responseObj {
  response: Response;
  message?: string;
  data?: any;
  errors?: any;
  code?: number;
}

const sendSuccess = ({ response, data = {}, message = 'Request successful' }: responseObj) => {
  return response.status(HttpStatusCode.SUCCESS).json({
    statuscode: HttpStatusCode.SUCCESS,
    message,
    data
  });
};

const sendError = ({
  response,
  errors = {},
  message = 'Invalid requests',
  code = HttpStatusCode.INVALID_REQUEST,
}: responseObj) => {
  return response.status(code).json({
    statuscode: code,
    message,
    errors
  });
};

export { sendError, sendSuccess };
