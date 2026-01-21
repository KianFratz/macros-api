import type { Response } from "express";

const handleResponse = <T = null>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export default handleResponse;