import { lazy } from 'react';

interface StringMap {
  [key: string]: string;
}

interface IArguments {
  prefix?: string;
  suffix?: string;
}

export const dynamicImport = (mapping: StringMap, args?: IArguments): object => {
  const { prefix = '', suffix = '' } = args;
  const obj: object = {};

  for (const key in mapping) {
    const componentName = mapping[key];
    obj[key] = lazy(() => import(`../../src/${prefix}/${componentName}${suffix}.tsx`));
  }
  return obj;
};
