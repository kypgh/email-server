import { ErrorRequestHandler } from "express"
import { HTTPError, HTTPValidationError } from "./HTTPError";
import { ZodError } from "zod";

const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validation Error", errors: err.errors });
  }

  if (err instanceof HTTPError) {
    return res.status(err.status).json(err.body);
  }
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

export default defaultErrorHandler;