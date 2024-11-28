import type { PagedResultRequestDto } from '@abp/ng.core';
import type { ClientDto } from '../clients/models';
import type { ProductDto } from '../products/models';

export interface CreateOrderDto {
  clientId?: string;
  lines: CreateOrderLineDto[];
}

export interface CreateOrderLineDto {
  productId?: string;
  count: number;
}

export interface GetOrderListDto extends PagedResultRequestDto {
  clientId?: string;
}

export interface OrderDto {
  id?: string;
  totalAmount: number;
  creationTime?: string;
  client: ClientDto;
  lines: OrderLineDto[];
}

export interface OrderLineDto {
  id?: string;
  count: number;
  unitPrice: number;
  product: ProductDto;
}
