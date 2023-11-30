import  { Channel, Connection, ConsumeMessage, connect } from "amqplib";
import { iQueueDriver } from "./contracts/iQueue";


class RabbitmqDriver implements iQueueDriver {

    name: string = 'Rabbitmq'

    private connection : Connection = null
    private channel : Channel = null
    
    constructor(){}

    get() { return this }


    onError(callback : (error : any) => void) {
        this.connection.once('close', callback)
        this.connection.on('error', callback)
    }

    async disconnect(): Promise<void> {
        this.connection && this.connection.close()
        this.channel && this.channel.close()
    }

    async connect(uri?: string): Promise<this> {
        if (!this.connection){
            const uriToConnectServerAmqp = uri ? uri : process.env.RABBITMQ_URI
            this.connection = await connect(uriToConnectServerAmqp)
            this.channel = await this.connection.createChannel()
        }

        return this
    }

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


export const QueueDriver : iQueueDriver = new RabbitmqDriver()