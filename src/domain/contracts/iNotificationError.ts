
export interface INotificationContent {
    message : string
    context ?: string
}

export interface INotificationHandler {
    AddNotification(error : INotificationContent) : void
    HasError(): boolean
    GetErrors() : Array<INotificationContent>
    CheckToNextStep() : void
    GetHowToMessages() : string
}