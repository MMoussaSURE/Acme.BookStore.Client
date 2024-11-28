import { mapEnumToOptions } from '@abp/ng.core';

export enum ClientType {
  External = 1,
  Internal = 2,
}

export const clientTypeOptions = mapEnumToOptions(ClientType);
