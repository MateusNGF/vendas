import { Db } from "mongodb";
import { AuthEntity } from "src/domain/entities";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { AuthenticateRepository } from "../../../../infra/database/mongodb/repositorys";
import { MongoDB } from "../../../../../src/infra/database/mongodb";


const getConnection = () : Db => {
    return MongoDB.getDatabase()
}

export const makeAuthenticateRepository = () : iAuthenticateRepository => {
    const database = getConnection()
    const authenticateColletion =  database.collection<AuthEntity>('authenticate')

    return new AuthenticateRepository(
        database, 
        authenticateColletion
    )
} 