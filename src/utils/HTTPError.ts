export class HTTPError extends Error {
  status: number;
  body: any;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HTTPError";
    this.status = status;
    this.body = { message };
  }
}

export class HTTPValidationError extends HTTPError {
  constructor(message: string, body: any) {
    super(message, 400);
    this.body = body;
  }
}