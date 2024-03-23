import { INotificationErrorDriver } from '../../../../domain/contracts';
import { NotificationErrorDriver } from '../../../../domain/errors';

export const NotificationHandlerSignUpAccountUser =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'CREATE_ACCOUNT_USER',
    });
  };

export const NotificationHandlerSignInAccountUser =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'ACCESS_ACCOUNT_USER',
    });
  };

export const NotificationHandlerGetAccountUser =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'GET_ACCOUNT_USER',
    });
  };

export const NotificationHandlerCreateIncomingTransactionForProducts =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'CREATE_INCOMING_TRANSACTION_PRODUCTS',
    });
  };

export const NotificationHandlerArchiveOrUnarchiveProduct =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'ARCHIVE_UNARCHIVE_PRODUCT',
    });
  };

export const NotificationHandlerRegisterProduct =
  (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'REGISTER_PRODUCT',
    });
  };

  export const NotificationHandlerRegisterCompany = (): INotificationErrorDriver => {
    return new NotificationErrorDriver({
      context: 'REGISTER_COMPANY',
    });
  };
