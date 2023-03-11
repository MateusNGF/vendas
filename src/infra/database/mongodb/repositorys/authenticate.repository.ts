import { Collection, Db, Filter } from 'mongodb';
import { AuthEntity } from 'src/domain/entities';
import { generateID } from '../../../../domain/utils';
import { BaseRepository } from '../../contracts/repositorys';
import { iAuthenticateRepository } from '../../contracts/repositorys/iAuthenticate.repository';

export class AuthenticateRepository implements iAuthenticateRepository {
  constructor(
    private readonly database: Db,
    private readonly colletion: Collection<AuthEntity>
  ) {}
  async create(auth: AuthEntity, options?: BaseRepository.QueryOptions): Promise<{ id: string }> {
    const idGenerate = auth.id ? auth.id : generateID();

    const result = await this.colletion.insertOne({
      ...auth,
      id: idGenerate,
    }, { session : options?.session?.get()});

    if (!result.acknowledged) return;

    return {
      id: idGenerate,
    };
  }
  
  findByAssocieted(associetedId: string, options?: BaseRepository.QueryOptions): Promise<AuthEntity> {
    return this.findOneWithProjection({ associeted_id: associetedId }, options);
  }

  findByEmail(email: string, options?: BaseRepository.QueryOptions): Promise<AuthEntity> {
    return this.findOneWithProjection({ email: email }, options);
  }

  findById(id: string, options?: BaseRepository.QueryOptions): Promise<AuthEntity> {
    return this.findOneWithProjection({ id: id }, options);
  }

  private findOneWithProjection(
    filter: Filter<AuthEntity>,
    options?: BaseRepository.QueryOptions
  ): Promise<AuthEntity> {
    return this.colletion.findOne(filter, {
      session: options?.session?.get(),
      projection: { _id: 0 }
    });
  }
}
