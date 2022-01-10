import { Response } from "express";
import { HTTPException } from "../context/shared/domain/httpException";

export const errorHandler = (res: Response, error: any, service: string) => {
  let statusCode = 500;

  console.log(service);
  console.log("🚀 -> errorHandler -> error", error.message ?? error.error);
  console.log("🚀 -> errorHandler -> error", error.name);
  console.log("🚀 -> errorHandler -> error", error);

  if (error.errors) error = error.errors[0];
  if (error instanceof HTTPException) statusCode = error.statusCode;

  res.status(statusCode).json({
    ok: false,
    error: error.message,
  });
};
