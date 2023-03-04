import { UserEntity } from 'src/domain/entities';
import { iGetAccountUserUsecase } from 'src/domain/usecases/user';
import { BaseRepository } from '.';

export interface iUserRepository extends BaseRepository<UserEntity> {
  create(user: UserEntity): Promise<{ id: string }>;
  makePartial(userPartial: Partial<UserEntity>): Partial<UserEntity>;
  getComplete(
    input: iGetAccountUserUsecase.Input
  ): Promise<iGetAccountUserUsecase.Output>;
}
