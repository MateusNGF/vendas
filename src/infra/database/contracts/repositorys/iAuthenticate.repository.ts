import { AuthEntity } from 'src/domain/entities/auth.entity';
import { BaseRepository } from '.';

export interface iAuthenticateRepository extends BaseRepository<AuthEntity> {
  create(auth: Partial<AuthEntity>, options?: BaseRepository.QueryOptions): Promise<{ id: string }>;
  findByAssocieted(associetedId: string, options?: BaseRepository.QueryOptions): Promise<AuthEntity>;
  findByEmail(email: string, options?: BaseRepository.QueryOptions): Promise<AuthEntity>;
}
