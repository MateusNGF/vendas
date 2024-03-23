import { iDriver } from '../../../infra/contracts/driver.interface';

export interface iQueueDriver<type_driver = any> extends iDriver<type_driver>, iDriver.iConnection {
  getManager(): iQueueDriver.iQueueManager;
}
export namespace iQueueDriver {
  export interface iQueueManager {
    publishInQueue<type_content = any>(queue: string, content: type_content): boolean;
    consumeInQueue(queue: string, callback: (content: any) => void): void;
  }
}
