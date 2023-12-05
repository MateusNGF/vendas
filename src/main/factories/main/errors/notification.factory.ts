import { INotificationErrorHandler } from "../../../../domain/contracts"
import { NotificationHandler } from "../../../../domain/errors"

export const NotificationHandlerCreateAccountUser = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "CREATE_ACCOUNT_USER"
    })
}

export const NotificationHandlerAccessAccountUser = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "ACCESS_ACCOUNT_USER"
    })
}

export const NotificationHandlerGetAccountUser = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "GET_ACCOUNT_USER"
    })
}


export const NotificationHandlerCreateIncomingTransactionForProducts = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "CREATE_INCOMING_TRANSACTION_PRODUCTS"
    })
}


export const NotificationHandlerArchiveOrUnarchiveProduct = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "ARCHIVE_UNARCHIVE_PRODUCT"
    })
}

export const NotificationHandlerRegisterProduct = () : INotificationErrorHandler => {
    return new NotificationHandler({
        context : "REGISTER_PRODUCT"
    })
}