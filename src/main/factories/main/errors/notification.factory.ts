import { INotificationErrorManager } from '../../../../domain/contracts';
import { NotificationErrorManager } from '../../../../domain/errors';

export const NotificationHandlerSignUpAccountUser =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'CREATE_ACCOUNT_USER',
    });
  };

export const NotificationHandlerSignInAccountUser =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'ACCESS_ACCOUNT_USER',
    });
  };

export const NotificationHandlerGetAccountUser =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'GET_ACCOUNT_USER',
    });
  };

export const NotificationHandlerCreateIncomingTransactionForProducts =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'CREATE_INCOMING_TRANSACTION_PRODUCTS',
    });
  };

export const NotificationHandlerArchiveOrUnarchiveProduct =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'ARCHIVE_UNARCHIVE_PRODUCT',
    });
  };

export const NotificationHandlerRegisterProduct =
  (): INotificationErrorManager => {
    return new NotificationErrorManager({
      context: 'REGISTER_PRODUCT',
    });
  };
