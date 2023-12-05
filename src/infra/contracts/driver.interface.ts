
export interface iDriver<type_driver = any> {
    readonly name : string
    readonly version ?: string

    get() : this
}


export namespace iDriver {
    export interface iConnection<type_driver = void> {
        connect(config ?: ConnectionOptions) : Promise<this>
        disconnect() : Promise<void>
        onError(callback : (error : any) => void) : void
    }


    export type ConnectionOptions = {
        uri ?: string,
        port?: string,
        callback ?: (content ?: any) => void
    }
}