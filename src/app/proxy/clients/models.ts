import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ClientType } from './client-type.enum';

export interface ClientDto extends EntityDto<string> {
  name?: string;
  type: ClientType;
}

export interface CreateClientDto {
  name: string;
  type: ClientType;
}

export interface GetClientListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface UpdateClientDto {
  name: string;
  type: ClientType;
}
