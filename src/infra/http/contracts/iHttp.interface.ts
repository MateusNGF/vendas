import { iDriver } from "../../../infra/contracts/driver.interface";

export interface iHttpDriver<DriverType = any> extends iDriver {

    readonly name: string;

    start(port: string, callback: () => any) : void;
    stop() : void;
    use(...args: Array<any>) : void;
    setupRoutes(pathRoutes ?: string) : Promise<void>;
}