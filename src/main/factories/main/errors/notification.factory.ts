import { INotificationHandler } from "../../../../domain/contracts"
import { NotificationHandler } from "../../../../domain/errors"

export const NotificationHandlerCreateAccountUser = () : INotificationHandler => {
    return new NotificationHandler({
        context : "CREATE_ACCOUNT_USER"
    })
}

export const NotificationHandlerAccessAccountUser = () : INotificationHandler => {
    return new NotificationHandler({
        context : "ACCESS_ACCOUNT_USER"
    })
}

export const NotificationHandlerGetAccountUser = () : INotificationHandler => {
    return new NotificationHandler({
        context : "GET_ACCOUNT_USER"
    })
}


export const NotificationHandlerCreateIncomingTransactionForProducts = () : INotificationHandler => {
    return new NotificationHandler({
        context : "CREATE_INCOMING_TRANSACTION_PRODUCTS"
    })
}


export const NotificationHandlerArchiveOrUnarchiveProduct = () : INotificationHandler => {
    return new NotificationHandler({
        context : "ARCHIVE_UNARCHIVE_PRODUCT"
    })
}

export const NotificationHandlerRegisterProduct = () : INotificationHandler => {
    return new NotificationHandler({
        context : "REGISTER_PRODUCT"
    })
}