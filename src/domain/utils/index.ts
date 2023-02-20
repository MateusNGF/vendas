export * from './ObjectManager';

export function ternary(primaryProp: any, secundaryProp: any) {
  return primaryProp ? primaryProp : secundaryProp ?? null;
}
