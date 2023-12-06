
export interface iApplication {
    start(callback ?: Function) : Promise<void>;
    stop(): Promise<void>;
}