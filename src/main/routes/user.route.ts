import { Router } from 'express';

export default (router: Router): void => {
  router.post('/register', async (req, res) => {
    try{
    }catch(e){
      console.log(e)
      res.status(400).send()
    }
  });
};
