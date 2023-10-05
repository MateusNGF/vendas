import { Collection, Db, Filter } from 'mongodb';
import { AuthEntity } from 'src/domain/entities';
import { generateID } from '../../../../domain/utils';
import { iAuthenticateRepository } from '../../contracts/repositorys/iAuthenticate.repository';
import { iDatabaseCached } from '../../contracts';

export class AuthenticateRepository implements iAuthenticateRepository {
  constructor(
    private readonly database: Db,
    private readonly colletion: Collection<AuthEntity>,
    private readonly memoryCache: iDatabaseCached
  ) {}
  async create(auth: AuthEntity): Promise<{ id: string }> {
    const idGenerate = auth.id ? auth.id : generateID();

    const result = await this.colletion.insertOne({
      ...auth,
      id: idGenerate,
    });

    if (result.acknowledged) {
      return {
        id: idGenerate,
      };
    }

    return;
  }
  async findByAssocieted(associetedId: string): Promise<AuthEntity> {
    let content = await this.memoryCache.get(associetedId);
    if (content) return content;

    content = await this.findOneWithProjection({ associeted_id: associetedId });
    await this.memoryCache.set(content.associeted_id, content);
    return content
  }

  findByEmail(email: string): Promise<AuthEntity> {
    return this.findOneWithProjection({ email: email });
  }

  async findById(id: string): Promise<AuthEntity> {
    let content = await this.memoryCache.get(id);
    if (content) return content;

    content = await this.findOneWithProjection({ id: id });
    await this.memoryCache.set(content.associeted_id, content);
    return content
  }

  private findOneWithProjection(
    filter: Filter<AuthEntity>
  ): Promise<AuthEntity> {
    return this.colletion.findOne(filter, { projection: { _id: 0 } });
  }
}
