import { iDatabaseCached } from "../../../../infra/database/contracts"
import { RedisDB, RedisManagerDatabase } from "../../../../infra/database/redis"


export const GetMemoryCached = (configuration: iDatabaseCached.iConfiguration): iDatabaseCached.iManager => {
    return new RedisManagerDatabase(
        RedisDB,
        configuration
    )
}