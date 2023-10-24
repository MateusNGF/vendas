import { LoggerProvider } from '../infra/logger';
import AppExpress from './config/appExpress';

(async () => {
  try {
    await AppExpress.init();
    await AppExpress.start();
  } catch (erro) {
    await AppExpress.close();
    LoggerProvider.error({
      message : erro.message,
      stack : erro.stack
    })
  }
})();