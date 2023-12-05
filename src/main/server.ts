import { HTTPDriver } from '../infra/http/express.http';
import { LoggerProvider } from '../infra/logger';
import { DatabaseDriver  } from '../infra/database/mongodb';
import { MemoryCacheDriver } from '../infra/database/redis';
import { AplicationDrive } from '../main/apps/application';
import { QueueDriver } from '../infra/queue/rabbitmq.queue';
import { iApplication } from './apps/app.interface';

(async () => {

  const Aplication : iApplication = new AplicationDrive(HTTPDriver, DatabaseDriver, MemoryCacheDriver, QueueDriver);

  try {

    await Aplication.init();
    await Aplication.start();

  } catch (erro) {

    await Aplication.stop();
    console.log(erro)
    LoggerProvider.error({
      message : erro.message,
      stack : erro.stack
    })
  }
})();