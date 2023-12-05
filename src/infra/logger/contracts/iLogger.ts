import { iDriver } from "../../../infra/contracts/driver.interface"


export interface iLoggerDriver<EngineType=any> extends iDriver<EngineType> {
    info(content : iLoggerDriver.Content): void
    error(content : iLoggerDriver.Content): void
    warn(content : iLoggerDriver.Content): void
}

export namespace iLoggerDriver {
    export interface Content {
        message : string
        description ?: any
        stack ?: any
    }
}