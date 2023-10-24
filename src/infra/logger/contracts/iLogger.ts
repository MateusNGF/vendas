

export interface iLogger<EngineType=any> {
    info(content : iLogger.Content): void
    error(content : iLogger.Content): void
    warn(content : iLogger.Content): void
    get() : EngineType
}


export namespace iLogger {
    export interface Content {
        message : string
        description ?: any
        stack ?: any
    }
}