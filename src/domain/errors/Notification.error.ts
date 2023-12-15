import { INotificationContent, INotificationErrorManager } from "../contracts/iNotificationError";

export class NotificationError extends Error {
    name: string = "Notification Error"
    notifications : Array<INotificationContent> = [];
    constructor(stackNotification : Array<INotificationContent>){
        super("");
        this.notifications = stackNotification
    }
}

export class NotificationContent implements INotificationContent {
    key: string;
    message: string;
    context?: string;

    constructor(notification : INotificationContent) {
        this.message = notification.message;
        this.key = notification.key;
        this.context = notification.context;
    }

    [Symbol.toPrimitive](convertTo: string): string {
        if (convertTo === "string"){
            const body =  `<${this.key.toUpperCase()}> ${this.message.toLowerCase()}`
            return this.context ? `${this.context.toUpperCase()} : ${body}` : body
        }
    }
}

export class NotificationErrorManager implements INotificationErrorManager {
    private stackNotifications: Array<INotificationContent> = [];

    constructor(
        private readonly _settings : { context : string }
    ){}

    AddNotification(error: INotificationContent): void {
        error.context = error.context ? error.context : this._settings.context
        this.stackNotifications.push(new NotificationContent(error));
    }
    HasError(): boolean {
        return !!this.stackNotifications.length
    }

    CheckToNextStep(){
        if (this.HasError()){
            throw new NotificationError(this.stackNotifications)
        }
    }

    GetErrors(): INotificationContent[] {
        return this.stackNotifications
    }
    GetToStrings(): string {
        return this.stackNotifications.map((error, index) => `${index+1}º ${String(error)}`).join(';\n ')
    }

}