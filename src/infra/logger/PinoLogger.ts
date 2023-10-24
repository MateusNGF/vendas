import { iLogger } from "./contracts/iLogger";
import pino from "pino";


class PinoLogger implements iLogger<pino.Logger> {

    private readonly engine = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                ignore: 'pid,hostname'
            }
        },
    })

    constructor(){}
    
    info(content: iLogger.Content): void {
        this.engine.info(content.message, content)
    }
    error(content: iLogger.Content): void {
        this.engine.error(content.message, content)
    }
    warn(content: iLogger.Content): void {
        this.engine.warn(content.message, content)
    }
    get() : pino.Logger {
        return this.engine
    }
    
}



export const LoggerProvider : iLogger = new PinoLogger()