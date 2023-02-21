import { randomBytes } from 'crypto';

export * from './ObjectManager';

export function ternary(primaryProp: any, secundaryProp: any) {
  return primaryProp ? primaryProp : secundaryProp ?? null;
}

export function generateID(length = 10){
  return randomBytes(length).toString('hex')
}
