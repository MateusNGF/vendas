import { INotificationContent, INotificationHandler } from "../contracts/iNotificationError";

export class NotificationError extends Error {
    name: string = "Notification Error"
    constructor(content:string){
        super(content)
    }
}

export class NotificationContent implements INotificationContent {
    key?: string;
    message: string;
    context: string;

    [Symbol.toPrimitive](convertTo: string): string {
        if (convertTo === "string"){
            if (this.key){
                return `<${this.key.toUpperCase()}>${this.context.toUpperCase()}: ${this.message}`
            }else{
                return `${this.context.toUpperCase()}: ${this.message}`
            }
        }
    }
}

export class NotificationHandler implements INotificationHandler {
    private readonly stackNotifications: Array<INotificationContent> = [];

    AddNotification(error: INotificationContent): void {
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