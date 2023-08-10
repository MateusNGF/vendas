
export interface INotificationContent {
    key : string
    message : string
    context ?: string
}

export interface INotificationHandler {
    AddNotification(error : INotificationContent) : void
    HasError(): boolean
    GetErrors() : Array<INotificationContent>
    CheckToNextStep() : void
    GetHowToStrings() : string
}