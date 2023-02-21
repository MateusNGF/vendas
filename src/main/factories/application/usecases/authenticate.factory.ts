import { CreateAuthenticate, CreateTokenAuthenticate, GetAuthenticateRecord } from "../../../../data/usecases/authenticate"
import { iCreateAuthentication, iCreateTokenAuthenticate, iGetAuthenticateRecord } from "src/domain/usecases/authenticate"
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography"
import { makeAuthenticateRepository } from "../../infra/database/mongo.factory"




export function makeGetAuthenticateRecordUsecase() : iGetAuthenticateRecord {
    const repository = makeAuthenticateRepository()
    return new GetAuthenticateRecord(repository)
}

export function makeCreateAuthenticateUsecase() : iCreateAuthentication {
    const repository = makeAuthenticateRepository()
    const getAuthenticate = makeGetAuthenticateRecordUsecase()
    const hashAdapter = makeHashAdapter()

    return new CreateAuthenticate(repository, getAuthenticate, hashAdapter)
}

export function makeCreateTokenAuthenticateUsecase() : iCreateTokenAuthenticate {
    const hashAdapter = makeHashAdapter()
    const getAuthenticate = makeGetAuthenticateRecordUsecase()
    const tokenAdapter = makeTokenAdapter() 

    return new CreateTokenAuthenticate(tokenAdapter, getAuthenticate, hashAdapter)
}