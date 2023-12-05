import  { Channel, Connection, ConsumeMessage, connect } from "amqplib";
import { iQueueDriver } from "./contracts/iQueue";
import { iDriver } from "../contracts/driver.interface";


class RabbitmqDriver implements iQueueDriver {

    readonly name: string = 'Rabbitmq'

    private connection : Connection = null
    private channel : Channel = null
    
    constructor(){}

    get() { return this }


    onError(callback : (error : any) => void) {
        this.connection.once('close', callback)
        this.connection.on('error', callback)
    }

    async disconnect(): Promise<void> {
        this.channel && this.channel.close()
        this.connection && this.connection.close()
    }

    async connect(config?: iDriver.ConnectionOptions): Promise<this> {
        if (!this.connection) {
            const uriToConnectServerAmqp = config?.uri ? config?.uri : process.env.RABBITMQ_URI
            this.connection = await connect(uriToConnectServerAmqp)
            this.channel = await this.connection.createChannel()
        }

        return this
    }


    public getManager(): iQueueDriver.iQueueManager {
        return new QueueManager(this.channel)
    }
}


export const QueueDriver : iQueueDriver = new RabbitmqDriver()

export class QueueManager  implements iQueueDriver.iQueueManager {

    constructor(
        private readonly channel: Channel,
    ){}

    publishInQueue(queue: string, content: any): boolean {
        return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)))
     }
 
     consumeInQueue(queue: string, callback: (content: ConsumeMessage) => void): void {
         this.channel.consume(queue, (msg) => {
             if (msg !== null) {
                 const content = JSON.parse(msg.content.toString())
                 callback(content)
                 this.channel.ack(msg)
             }
         })
     }
}