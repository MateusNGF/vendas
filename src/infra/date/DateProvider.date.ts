import { iDateProvider } from './contracts/iDateProvider.contract';

class DateManager implements iDateProvider {
  constructor(
    private readonly dateRef: string | number | Date = new Date(),
    private readonly locateFormart: iDateProvider.Locates = 'en-US'
  ) {}

  now(): iDateProvider {
    return new DateManager(new Date());
  }

  toISOString(): string {
    return new Date(this.dateRef).toISOString();
  }

  toPrimitive(): Date {
    return new Date(this.dateRef);
  }

  toDateString(locateFormart?: iDateProvider.Locates): string {
    return new Date(this.dateRef).toLocaleDateString(
      locateFormart ?? this.locateFormart
    );
  }

  isBefore(dateToCompare: string | Date): boolean {
    if (!dateToCompare) return false;

    return new Date(this.dateRef) <= new Date(dateToCompare);
  }

  isAfter(dateToCompare: string | Date): boolean {
    if (!dateToCompare) return false;

    return new Date(this.dateRef) >= new Date(dateToCompare);
  }

  isEqual(dateToCompare: string | Date): boolean {
    if (!dateToCompare) return false;

    return new Date(this.dateRef) === new Date(dateToCompare);
  }

  addDays(days: number): iDateProvider {
    if (!days) return;

    const currentDate = new Date(this.dateRef);
    currentDate.setDate(currentDate.getDate() + days);
    return new DateManager(currentDate);
  }

  subtractDays(days: number): iDateProvider {
    if (!days) return;

    const currentDate = new Date(this.dateRef);
    currentDate.setDate(currentDate.getDate() - days);
    return new DateManager(currentDate);
  }

  tz(timezone?: iDateProvider.Timezone): Date {
    const dateNormalized = new Date(this.dateRef).toLocaleString(
      this.locateFormart,
      { timeZone: timezone ?? process.env.TZ }
    );
    return new Date(dateNormalized);
  }
}

export const DateProvider = (
  date?: string | Date,
  locate?: iDateProvider.Locates
): iDateProvider => new DateManager(date, locate);
