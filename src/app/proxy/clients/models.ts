import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ClientType } from './client-type.enum';
import type { AddressDto, CreateAddressDto } from '../common/address/models';

export interface ClientDto extends EntityDto<string> {
  name?: string;
  type: ClientType;
  homeAddress: AddressDto;
  businessAddress: AddressDto;
}

export interface CreateClientDto {
  name: string;
  type: ClientType;
  homeAddress: CreateAddressDto;
  businessAddress: CreateAddressDto;
}

export interface GetClientListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface UpdateClientDto {
  name: string;
  type: ClientType;
}
