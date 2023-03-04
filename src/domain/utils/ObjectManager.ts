import {
  EmptyParamError,
  MissingParamError,
  UnexpectedParamError,
} from '../errors/validation.error';

export class ObjectManager extends Object {
  /**
   * Essa função verifica se em um determinado objeto tem as chaves necessarias.
   * Security, true e false, ambos retornar MissingParam, mas somente true retorna UnexpectedParam.
   * @param requireds chaves que necessaririas
   * @param content objecto de verificação
   * @param security true para deixar apenas os required no objeto, false verifica se tem pelo menos os requireds.
   */
  static hasKeys<TypeKeysRequireds = string>(
    requireds: Array<keyof TypeKeysRequireds>,
    content: any,
    security: boolean = false
  ) {

    if (Array.isArray(content)) {
      content.forEach((i) => this.hasKeys(requireds, i, security))
    }else{
      if (security) {
        ObjectManager.hasTheseProperties(requireds, content);
        ObjectManager.justTheseProperties(requireds, content);
      } else {
        ObjectManager.hasTheseProperties(requireds, content);
      }
    }
  }

  static justTheseProperties(requireds: Array<any>, object: object) {
    for (const key in object) {
      if (!requireds.find((element) => element == key)) {
        throw new UnexpectedParamError(key);
      }
    }
  }

  static hasTheseProperties(requireds: Array<any>, object: object) {
    requireds.forEach((element: any) => {
      if (!(element in object)) throw new MissingParamError(element);
      if (!object[element]) throw new EmptyParamError(element);
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
