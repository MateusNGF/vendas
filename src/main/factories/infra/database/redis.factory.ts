import { iMemoryCachedDriver } from "../../../../infra/database/contracts"
import { MemoryCacheDriver, RedisManagerDatabase } from "../../../../infra/database/redis"


export const GetMemoryCached = (configuration: iMemoryCachedDriver.iConfiguration): iMemoryCachedDriver.iManager => {
    return new RedisManagerDatabase(
        MemoryCacheDriver,
        configuration
    )
}