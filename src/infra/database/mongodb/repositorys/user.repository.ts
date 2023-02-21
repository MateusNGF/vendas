import { Collection, Db, Filter } from "mongodb";
import { AuthEntity, UserEntity } from "src/domain/entities";
import { iGetAccountUserUsecase } from "src/domain/usecases/user";
import { generateID } from "../../../../domain/utils";
import { iAuthenticateRepository } from "../../contracts/repositorys/iAuthenticate.repository";
import { iUserRepository } from "../../contracts/repositorys/iUser.repository";


export class UserRepository implements iUserRepository {

    constructor(
        private readonly database: Db,
        private readonly colletionUser: Collection<UserEntity>,
        private readonly authRepository : iAuthenticateRepository
    ) {}

    async getComplete(input: iGetAccountUserUsecase.Input): Promise<iGetAccountUserUsecase.Output> {
        let auth : AuthEntity;
        if (input.email){
            auth = await this.authRepository.findByEmail(input.email)
        } else if (input.user_id){
            auth = await this.authRepository.findByAssocieted(input.user_id)
        }

        if (!auth) return null;

        const user = await this.findOneWithProjection({ id : input.user_id})
        if (!user) return null;

        return {
            id :  user.id,
            access_level : auth.access_level,
            email : auth.email,
            archived_date : user.archived_date,
            name: user.name,
            created_at : user.created_at,
            updated_at : user.updated_at
        }
    }

    makePartial(userPartial : Partial<UserEntity>) : Partial<UserEntity>{
        return {
            id  : generateID(),
            ...userPartial
        }
    }

    async create(user: UserEntity): Promise<{ id: string; }> {
        const generateId = user.id ? user.id : generateID()
        const resutl = await this.colletionUser.insertOne({
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
        return this.colletionUser.findOne(filter, { projection: { _id: 0 } })
    }

}