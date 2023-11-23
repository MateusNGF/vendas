export interface iHttp<DriverType = any> {
    start(port: string, callback: () => any) : void;
    stop() : void;
    use(...args: Array<any>) : void;
    setupRoutes(pathRoutes ?: string) : Promise<void>;
}