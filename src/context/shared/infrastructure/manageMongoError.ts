import { HTTPException } from '../domain/httpException';

export const manageMongoError = (error: any, logMessage: string) => {
  const keyPattern = error.keyPattern;
  if (!keyPattern) {
    throw new HTTPException(logMessage, 'server error', 500);
  }

  const keys = Object.keys(keyPattern);
  throw new HTTPException(logMessage, `${keys[0]} already exist`, 400);
};
