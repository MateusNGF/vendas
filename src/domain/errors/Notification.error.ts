import { INotificationContent, INotificationHandler } from "../contracts/iNotificationError";

export class NotificationError extends Error {
    name: string = "Notification Error"
    constructor(content:string){
        super(content)
    }
}

export class NotificationContent implements INotificationContent {
    message: string;
    context?: string;

    constructor(message: string, context?: string) {
        this.message = message;
        this.context = context;
    }

    [Symbol.toPrimitive](convertTo: string): string {
        if (convertTo === "string"){
            return this.context ? `${this.context.toUpperCase()}: ${this.message.toLowerCase()}` : ` ${this.message.toLowerCase()}`
        }
    }
}

export class NotificationHandler implements INotificationHandler {
    private readonly stackNotifications: Array<INotificationContent> = [];

    constructor(
        private readonly _settings : { context : string }
    ){}

    AddNotification(error: INotificationContent): void {
        error.context = this._settings.context
        this.stackNotifications.push(error);
    }
    HasError(): boolean {
        return !!this.stackNotifications.length
    }

    CheckToNextStep(){
        if (this.HasError()){
            throw new NotificationError(this.GetHowToMessages())
        }
    }

    GetErrors(): INotificationContent[] {
        return this.stackNotifications
    }
    GetHowToMessages(): string {
        return this.stackNotifications.map((error, index) => `${index+1}º ${String(error)}`).join(';\n')
    }

}