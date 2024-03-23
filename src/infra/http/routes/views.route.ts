import { Router } from 'express';
import path from 'path';

export default (route: Router) => {
  const makePath = (_path: string) => path.join(__dirname, `../../../application/presenter/pages/${_path}`);

  route.get('/signin', (req, res) => {
    res.sendFile(makePath('signin/index.html'));
  });

  route.get('/home', (req, res) => {
    res.sendFile(makePath('home/index.html'));
  });
};
