import { RequestHandler } from 'express';
import { iController } from '../../application/contracts';

type Adapter = (controller: iController) => RequestHandler;

export const adaptExpressRoute: Adapter =
  (controller: iController) => async (req, res) => {
    const { data, status } = await controller.exec({
      body: req.body,
      params: req.params,
      headers: req.headers as any,
      query: req.query,
    });
    const json = [200, 204].includes(status) ? data : { error: data };
    res.status(status).json(json);
  };
