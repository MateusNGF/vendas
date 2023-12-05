
export interface INotificationContent {
    key : string
    message : string
    context ?: string
}

export interface INotificationErrorHandler {
    AddNotification(error : INotificationContent) : void
    HasError(): boolean
    GetErrors() : Array<INotificationContent>
    CheckToNextStep() : void
    GetToStrings() : string
}