import { Db } from "mongodb";
import { AuthEntity, UserEntity } from "src/domain/entities";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { AuthenticateRepository } from "../../../../infra/database/mongodb/repositorys";
import { MongoDB } from "../../../../../src/infra/database/mongodb";
import { iUserRepository } from "src/infra/database/contracts/repositorys/iUser.repository";
import { UserRepository } from "../../../../infra/database/mongodb/repositorys/user.repository";


const getConnection = () : Db => {
    return MongoDB.getDatabase()
}

export const makeAuthenticateRepository = () : iAuthenticateRepository => {
    const database = getConnection()
    const authenticateColletion =  database.collection<AuthEntity>('authenticates')

    return new AuthenticateRepository(
        database, 
        authenticateColletion
    )
} 


export const makeUserRepository = () : iUserRepository => {
    const database = getConnection()
    const userRepository = database.collection<UserEntity>('users')

    return new UserRepository(database, userRepository)
}