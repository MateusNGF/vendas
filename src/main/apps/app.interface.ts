
export interface iApplication {
    start(): Promise<void>;
    stop(): Promise<void>;
    init(callback ?: Function) : Promise<this>;
}