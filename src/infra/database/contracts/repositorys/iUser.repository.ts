import { UserEntity } from "src/domain/entities";
import { BaseRepository } from ".";

export interface iUserRepository extends BaseRepository<UserEntity>{
    findById(id  :string) : Promise<UserEntity>
    create(user : UserEntity) : Promise<{ id : string}>
    makePartial(userPartial : Partial<UserEntity>) : Partial<UserEntity>
}