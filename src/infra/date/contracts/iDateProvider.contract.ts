import { iDriver } from 'src/infra/contracts/driver.interface';

export interface iDateProvider extends iDriver {
  now(): iDateProvider;
  isBefore(dateToCompare: string | Date): boolean;
  isAfter(dateToCompare: string | Date): boolean;
  isEqual(dateToCompare: string | Date): boolean;

  toISOString(): string;
  toPrimitive(): Date;
  toDateString(locateFormar?: iDateProvider.Locates): string;

  addDays(days: number): iDateProvider;
  subtractDays(days: number): iDateProvider;

  tz(timezone: iDateProvider.Timezone): Date;
}

export namespace iDateProvider {
  export type Locates = 'en-US' | 'pt-BR';
  export type Timezone = string;
}
