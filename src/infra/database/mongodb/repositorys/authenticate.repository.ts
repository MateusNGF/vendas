import { Collection, Db, Filter } from "mongodb";
import { AuthEntity } from "src/domain/entities";
import { generateID } from "../../../../domain/utils";
import { iAuthenticateRepository } from "../../contracts/repositorys/iAuthenticate.repository";

export class AuthenticateRepository implements iAuthenticateRepository {

    constructor(
        private readonly database: Db,
        private readonly colletion: Collection<AuthEntity>
    ) {}
    async create(auth: AuthEntity): Promise<{ id: string }> {
        const idGenerate = generateID();

        const result = await this.colletion.insertOne({
            ...auth,
            id: idGenerate
        })

        if (result.acknowledged) {
            return {
                id: idGenerate
            }
        }
 
        return;
    }
    findByAssocieted(associetedId: string): Promise<AuthEntity> {
        return this.findOneWithProjection({ associeted_id: associetedId })
    }

    findByEmail(email: string): Promise<AuthEntity> {
        return this.findOneWithProjection({ email: email })
    }

    findById(id: string): Promise<AuthEntity> {
        return this.findOneWithProjection({ id: id })
    }


    private findOneWithProjection(filter: Filter<AuthEntity>): Promise<AuthEntity> {
        return this.colletion.findOne(filter, { projection: { _id: 0 } })
    }

}