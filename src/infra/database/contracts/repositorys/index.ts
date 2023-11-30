import { iEntity } from 'src/domain/contracts';
import { iDatabaseDriver } from '../iDatabase';

export abstract class BaseRepository<Schema extends iEntity> {
  abstract findById(
    id: string,
    options?: BaseRepository.QueryOptions
  ): Promise<Schema>;
}

export namespace BaseRepository {
  export interface QueryOptions {
    session?: iDatabaseDriver.iSession;
  }
}
