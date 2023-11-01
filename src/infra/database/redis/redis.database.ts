import { RedisClientType, createClient} from 'redis'
import { iDatabaseCached } from '../contracts'


class RedisDriveDatabase implements iDatabaseCached<RedisClientType> {
    public client: RedisClientType

    async connect(){
        if (!this.client){
            this.client = createClient({
                url: process.env.REDIS_URL
            })

            await this.client.connect()
        } 
    }

    async onError(callback: any){
        this.client.on('error', callback)
    }
}


export class RedisManagerDatabase implements iDatabaseCached.iManager {

    constructor(
        private readonly drive: iDatabaseCached<RedisClientType>,
        private readonly configuration: iDatabaseCached.iConfiguration
    ){}

    async set(key: string, value : any, options = { expire : 60 * 5 }){
        if ( !this.drive.client || ( !key || !value ) ) return null

        key = this.BuildContext(key)

        await this.drive.client?.set(key, JSON.stringify(value), {
            EX : options.expire
        })
    }

    async get<type=any>(key : string) : Promise<type> {
        if (!this.drive.client || !key) return null

        key = this.BuildContext(key)

        const content = await this.drive.client?.get(key)
        return JSON.parse(content) 
    }


    async del(key : string){
        key = this.BuildContext(key)

        if (!this.drive.client || !key) return null
        await this.drive.client?.del(key)
    }


    private BuildContext(key : string){
        return this.configuration.context ? `${this.configuration.context.toUpperCase()}|${key}` : key
    }

}


export const RedisDB : iDatabaseCached = new RedisDriveDatabase()