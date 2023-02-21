import { CreateAuthenticateData, CreateTokenAuthenticateData, GetAuthenticateRecordData } from "../../../../data/usecases/authenticate"
import { iCreateAuthenticationUsecase, iCreateTokenAuthenticateUsecase, iGetAuthenticateRecordUsecase } from "src/domain/usecases/authenticate"
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography"
import { makeAuthenticateRepository } from "../../infra/database/mongo.factory"




export function makeGetAuthenticateRecordUsecase() : iGetAuthenticateRecordUsecase {
    const repository = makeAuthenticateRepository()
    return new GetAuthenticateRecordData(repository)
}

export function makeCreateAuthenticateUsecase() : iCreateAuthenticationUsecase {
    const repository = makeAuthenticateRepository()
    const getAuthenticate = makeGetAuthenticateRecordUsecase()
    const hashAdapter = makeHashAdapter()

    return new CreateAuthenticateData(repository, getAuthenticate, hashAdapter)
}

export function makeCreateTokenAuthenticateUsecase() : iCreateTokenAuthenticateUsecase {
    const hashAdapter = makeHashAdapter()
    const getAuthenticate = makeGetAuthenticateRecordUsecase()
    const tokenAdapter = makeTokenAdapter() 

    return new CreateTokenAuthenticateData(tokenAdapter, getAuthenticate, hashAdapter)
}