import configureMeasurements from 'convert-units';
import allMeasures from 'convert-units/definitions/all';

export const convert = (number: number) => configureMeasurements(allMeasures)(Number(number) || undefined);
