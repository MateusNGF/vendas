import { Collection, Db, Filter } from "mongodb";
import { UserEntity } from "src/domain/entities";
import { generateID } from "../../../../domain/utils";
import { iUserRepository } from "../../contracts/repositorys/iUser.repository";


export class UserRepository implements iUserRepository {

    constructor(
        private readonly database: Db,
        private readonly colletion: Collection<UserEntity>
    ) {}

    makePartial(userPartial : Partial<UserEntity>) : Partial<UserEntity>{
        return {
            id  : generateID(),
            ...userPartial
        }
    }

    async create(user: UserEntity): Promise<{ id: string; }> {
        const generateId = user.id ? user.id : generateID()
        const resutl = await this.colletion.insertOne({
            ...user,
            id : generateId
        })
        if (resutl.acknowledged){
            return { id : generateId}
        }
    }


    findById(id: string): Promise<UserEntity> {
        return this.findOneWithProjection({ id: id })
    }


    private findOneWithProjection(filter: Filter<UserEntity>): Promise<UserEntity> {
        return this.colletion.findOne(filter, { projection: { _id: 0 } })
    }

}