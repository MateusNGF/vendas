import { DateProvider } from '../date-provider.date';

describe('Date Provider', () => {
  it('Should return true if dateA is before dateB', () => {
    const dateA = '2002/03/21';
    const dateB = '2002/03/22';

    expect(DateProvider(dateA).isBefore(dateB)).toEqual(true);
  });

  it('Should return false if dateA not is before dateB', () => {
    const dateA = '2002/03/23';
    const dateB = '2002/03/22';

    expect(DateProvider(dateA).isBefore(dateB)).toEqual(false);
  });

  it('Should return true if dateA is after dateB', () => {
    const dateA = '2002/03/23';
    const dateB = '2002/03/22';

    expect(DateProvider(dateA).isAfter(dateB)).toEqual(true);
  });

  it('Should return false if dateA not is after dateB', () => {
    const dateA = '2002/03/20';
    const dateB = '2002/03/22';

    expect(DateProvider(dateA).isAfter(dateB)).toEqual(false);
  });

  it('Should return a date with 3 day more - (pt-BR)', () => {
    const dateInput = '2002/03/20';
    const dateOutput = '23/03/2002';

    const dateWithAdd = DateProvider(dateInput).addDays(3);
    expect(dateWithAdd.toDateString('pt-BR')).toEqual(dateOutput);
  });

  it('Should return a date with 45 day more - (pt-BR)', () => {
    const dateInput = '2002/01/03';

    // dia, mes e ano
    const dateOutput = '17/02/2002';

    const dateWithAdd = DateProvider(dateInput).addDays(45);
    expect(dateWithAdd.toDateString('pt-BR')).toEqual(dateOutput);
  });

  it('Should return false if after adding 3 days the test date is less than the date summed to 3 days', () => {
    const dateInput = '2002/01/03';
    const dateForTest = '2002/01/07';

    const dateWithAdd = DateProvider(dateInput).addDays(3);
    const isAfter = dateWithAdd.isAfter(dateForTest);
    expect(isAfter).toEqual(false);
  });

  it('Should return true if after adding 3 days the test date is greater than the date added to 3 days', () => {
    const dateInput = '2023/01/01';
    const dateForTest = '2023/01/02';

    const dateWithAdd = DateProvider(dateInput).addDays(3);
    const isAfter = dateWithAdd.isAfter(dateForTest);
    expect(isAfter).toEqual(true);
  });

  it('Should return the current date with 3 days less. (pt-BR)', () => {
    const dateInput = '2023/01/6';

    // dia, mes e ano
    const dateOutput = '03/01/2023';

    const dateWithAdd = DateProvider(dateInput).subtractDays(3);
    expect(dateWithAdd.toDateString('pt-BR')).toEqual(dateOutput);
  });
});
