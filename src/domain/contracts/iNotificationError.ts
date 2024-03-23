export interface INotificationErrorDriver {
  create(settings?: INotificationErrorDriver.IDriverSettings): Promise<INotificationErrorDriver.IManager>;
}

export namespace INotificationErrorDriver {
  export interface IManager {
    AddNotification(error: INotificationContent): void;
    HasError(): boolean;
    GetErrors(): Array<INotificationContent>;
    CheckToNextStep(): void;
    GetToStrings(): string;
  }

  export interface IDriverSettings {
    context: string;
  }

  export interface INotificationContent {
    key: string;
    message: string;
    context?: string;
  }
}
