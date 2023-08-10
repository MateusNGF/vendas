import { NotificationHandler } from "../../../../domain/errors"

export const makeCreateAccountUserNotification = () => {
    return new NotificationHandler({
        context : "CREATE_ACCOUNT_USER"
    })
}

export const makeAccessAccountUserNotification = () => {
    return new NotificationHandler({
        context : "ACCESS_ACCOUNT_USER"
    })
}

export const makeGetAccountUserNotification = () => {
    return new NotificationHandler({
        context : "GET_ACCOUNT_USER"
    })
}