import { RequestHandler } from 'express';
import { iController } from '../../application/contracts';
import { makeBodyResponse } from '.';

type Adapter = (controller: iController) => RequestHandler;

export const adaptExpressRoute: Adapter =
  (controller: iController) => async (req, res) => {
    const { data, status } = await controller.exec({
      body: req.body,
      params: req.params,
      headers: req.headers as any,
      query: req.query,
    });
    res.status(status).json(makeBodyResponse(status, data));
  };
