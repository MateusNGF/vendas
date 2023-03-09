import { Collection, Filter } from 'mongodb';
import { iEntity } from 'src/domain/contracts';
import { BaseRepository } from '../../contracts/repositorys';

export * from './authenticate.repository';
export * from './product.repository';
export * from './user.repository';
export * from './company.respository'
export * from './transaction.repository'

export abstract class MongoRepository<EntitySchema extends iEntity> {

    private colletion: Collection<EntitySchema>;

    private findOneWithProjection(
        filter: Filter<EntitySchema>,
        options?: BaseRepository.QueryOptions
    ): Promise<EntitySchema> {
        const session = options && options.session ? options.session.get() : null;
        return this.colletion.findOne(filter, {
            session,
            projection: { _id: 0 },
        }) as any;
    }
}
