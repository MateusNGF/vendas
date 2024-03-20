import { INotificationErrorDriver } from '../contracts/iNotificationError';

export class ObjectManager extends Object {
  /**
   * Essa função verifica se em um determinado objeto tem as chaves necessarias.
   * Security, true e false.
   * @param requireds chaves que tem que existir
   * @param content objeto a ser verificado
   * @param notification instancia de INotificationErrorHandler
   * @param security true para deixar apenas os required no objeto, false verifica se tem pelo menos os requireds.
   */

  static hasKeysWithNotification<TypeKeysRequireds = string>(
    requireds: Array<keyof TypeKeysRequireds>,
    content: any,
    notification: INotificationErrorDriver.IManager,
    security: boolean = false
  ) {
    if (Array.isArray(content)) {
      content.forEach((i) =>
        this.hasKeysWithNotification(requireds, i, notification, security)
      );
    } else {
      if (security) {
        ObjectManager.hasThesePropertiesNotification(
          requireds,
          content,
          notification
        );
        ObjectManager.justThesePropertiesNotification(
          requireds,
          content,
          notification
        );
      } else {
        ObjectManager.hasThesePropertiesNotification(
          requireds,
          content,
          notification
        );
      }
    }
  }

  static justThesePropertiesNotification(
    requireds: Array<any>,
    object: object,
    notification: INotificationErrorDriver.IManager
  ) {
    for (const key in object) {
      if (!requireds.find((element) => element == key)) {
        // UnexpectedParamError
        notification.AddNotification({
          key: key,
          message: `It's param not is required.`,
        });
      }
    }
  }

  static hasThesePropertiesNotification(
    requireds: Array<any>,
    object: object,
    notification: INotificationErrorDriver.IManager
  ) {
    requireds.forEach((element: any) => {
      if (!(element in object)) {
        // MissingParamError
        return notification.AddNotification({
          key: element,
          message: `it's key is required.`,
        });
      }
      if (!object[element]) {
        // EmptyParamError
        return notification.AddNotification({
          key: element,
          message: `It's key can't be empty.`,
        });
      }
    });
  }

  /**
   * Faz uma assinatura das chaves que tem interceção entre os dois objectos.
   * @param obj objecto a receber os valores (dest)
   * @param input objeto desconhecido trazendo os valores (source)
   * @returns obj
   */
  static assing(obj: object, input: object) {
    if (!obj || !input) throw new Error('Input or obj is null in assing.');
    for (const key in obj) {
      if (input[key]) {
        obj[key] = input[key];
      }
    }
    return obj;
  }
}
