import { ExpressHttp } from '../infra/http/express.http';
import { LoggerProvider } from '../infra/logger';
import { MongoDB } from '../infra/database/mongodb';
import { RedisDB } from '../infra/database/redis';
import { AplicationDrive } from '../main/apps/application';

(async () => {

  const Aplication = new AplicationDrive(ExpressHttp, MongoDB, RedisDB);

  try {

    await Aplication.init();
    await Aplication.start();

  } catch (erro) {

    await Aplication.stop();
    LoggerProvider.error({
      message : erro.message,
      stack : erro.stack
    })
  }
})();