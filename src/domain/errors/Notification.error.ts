import {
  INotificationErrorDriver,
} from '../contracts/iNotificationError';

export class NotificationError extends Error {
  name: string = 'Notification Error';
  notifications: Array<INotificationErrorDriver.INotificationContent> = [];
  constructor(stackNotification: Array<INotificationErrorDriver.INotificationContent>) {
    super('');
    this.notifications = stackNotification;
  }
}

export class NotificationContent implements INotificationErrorDriver.INotificationContent {
  key: string;
  message: string;
  context?: string;

  constructor(notification: INotificationErrorDriver.INotificationContent) {
    this.message = notification.message;
    this.key = notification.key;
    this.context = notification.context;
  }

  [Symbol.toPrimitive](convertTo: string): string {
    if (convertTo === 'string') {
      const body = `<${this.key.toUpperCase()}> ${this.message.toLowerCase()}`;
      return this.context ? `${this.context.toUpperCase()} : ${body}` : body;
    }
  }
}

export class NotificationErrorDriver implements INotificationErrorDriver {
  constructor(private readonly _settings: INotificationErrorDriver.IDriverSettings) {}
    async create(settings : INotificationErrorDriver.IDriverSettings): Promise<INotificationErrorDriver.IManager> {
        return new NotificationErrorManager(settings ?? this._settings);
    }
}


class NotificationErrorManager implements INotificationErrorDriver.IManager {
  private stackNotifications: Array<INotificationErrorDriver.INotificationContent> = [];

  constructor(private readonly _settings?: INotificationErrorDriver.IDriverSettings) {}

  AddNotification(error: INotificationErrorDriver.INotificationContent): void {
    error.context = error.context ? error.context : this._settings.context;
    this.stackNotifications.push(new NotificationContent(error));
  }
  HasError(): boolean {
    return !!this.stackNotifications.length;
  }

  CheckToNextStep() {
    if (this.HasError()) {
      throw new NotificationError(this.stackNotifications);
    }
  }

  GetErrors(): INotificationErrorDriver.INotificationContent[] {
    return this.stackNotifications;
  }
  GetToStrings(): string {
    return this.stackNotifications
      .map((error, index) => `${index + 1}º ${String(error)}`)
      .join(';\n ');
  }

}
