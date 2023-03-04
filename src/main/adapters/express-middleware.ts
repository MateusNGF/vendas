import { NextFunction, Request, Response } from 'express';
import { iMiddleware } from 'src/application/contracts/iMiddleware';

export const adaptExpressMiddleware =
  (middleware: iMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, data } = await middleware.run({
      headers: req.headers as any,
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if ([200, 202].includes(status)) {
      req.headers = {
        ...req.headers,
        ...data,
      };
      next();
    } else {
      res.status(status).json({ error: data.message });
    }
  };
