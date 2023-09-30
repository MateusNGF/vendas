import { RedisClientType, createClient} from 'redis'
import { iDatabaseCached } from '../contracts'


class RedisDriveDatabase implements iDatabaseCached {
    private client: RedisClientType = null

    async connect(){
        if (!this.client){
            this.client = createClient({
                url: process.env.REDIS_URL
            })

            await this.client.connect()
        } 
    }

    async set(key: string, value : any, options = { expire : 60 * 5 }){
        if ( !this.client || ( !key || !value ) ) return null

        await this.client.set(key, JSON.stringify(value), {
            EX : options.expire
        })
    }

    async get<type=any>(key : string) : Promise<type> {
        if (!this.client || !key) return null
        const content = await this.client.get(key)
        return JSON.parse(content) 
    }


    async del(key : string){
        if (!this.client || !key) return null
        await this.client.del(key)
    }
}


export const RedisDB : iDatabaseCached = new RedisDriveDatabase()