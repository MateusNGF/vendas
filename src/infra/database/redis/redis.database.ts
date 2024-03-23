import { RedisClientType, createClient } from 'redis';
import { iMemoryCachedDriver } from '../contracts';
import { iDriver } from 'src/infra/contracts/driver.interface';

class RedisDriveDatabase implements iMemoryCachedDriver<RedisClientType> {
  readonly name: string = 'RedisDB';

  public client: RedisClientType;

  public async connect(config?: iDriver.ConnectionOptions): Promise<this> {
    if (!this.client || !this.client.isOpen) {
      this.client = createClient({
        url: config?.uri ?? process.env.REDIS_URL,
      });

      await this.client.connect();
      config?.callback && config.callback();
    }

    return this;
  }

  public get() {
    return this;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
    }
  }

  async onError(callback: (error: any) => void) {
    this.client.once('close', callback);
    this.client.once('error', callback);
  }
}

export class RedisManagerDatabase implements iMemoryCachedDriver.iManager {
  constructor(
    private readonly drive: iMemoryCachedDriver<RedisClientType>,
    private readonly configuration: iMemoryCachedDriver.iConfiguration
  ) {}

  async set(key: string, value: any, options = { expire: 60 * 5 }) {
    if (!this.drive.client?.isReady || !key || !value) return null;

    key = this.BuildContext(key);

    await this.drive.client?.set(key, JSON.stringify(value), {
      EX: options.expire,
    });
  }

  async get<type = any>(key: string): Promise<type> {
    if (!this.drive.client?.isReady || !key) return null;

    key = this.BuildContext(key);

    const content = await this.drive.client?.get(key);
    return JSON.parse(content);
  }

  async del(key: string) {
    if (!this.drive.client?.isReady  || !key) return null;

    key = this.BuildContext(key);

    await this.drive.client?.del(key);
  }

  private BuildContext(key: string) {
    return this.configuration.context
      ? `${this.configuration.context.toUpperCase()}|${key}`
      : key;
  }
}

export const MemoryCacheDriver: iMemoryCachedDriver = new RedisDriveDatabase();
