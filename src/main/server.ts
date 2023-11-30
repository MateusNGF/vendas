import { HTTPDriver } from '../infra/http/express.http';
import { LoggerProvider } from '../infra/logger';
import { DatabaseDriver  } from '../infra/database/mongodb';
import { MemoryCacheDriver } from '../infra/database/redis';
import { AplicationDrive } from '../main/apps/application';
import { QueueDriver } from '../infra/queue/rabbitmq.queue';

(async () => {

  const Aplication = new AplicationDrive(HTTPDriver, DatabaseDriver, MemoryCacheDriver, QueueDriver);

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