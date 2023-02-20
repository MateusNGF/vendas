import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';

export default (router: Router): void => {
  router.post('/register', (req, res) => {
    res.send({ heloo: 'hello' });
  });
};
