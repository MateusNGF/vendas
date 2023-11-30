import { iDriver } from "../../../infra/contracts/driver.interface";


export interface iQueueDriver<TYPE = any> extends iDriver {
    get(): TYPE

    connect(uri ?: string): Promise<this>
    disconnect(): Promise<void>
    onError(callback : (error : any) => void): void

    publishInQueue(queue: string, content: any): boolean;
    consumeInQueue(queue: string, callback: (content: any) => void): void;
}