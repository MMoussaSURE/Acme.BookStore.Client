import { Component,OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagingService } from '../services/messaging.service';
import { OrderService, OrderDto, OrderLineDto } from '@proxy/orders';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class OrderComponent implements OnInit {
 
  order = { items: [], totalCount: 0 } as PagedResultDto<OrderDto>;
  form: FormGroup;
  selectedOrder = {} as OrderDto;
  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private messagingService: MessagingService
  ) {
    
  }



  ngOnInit(): void {
    const orderStreamCreator = (query) => this.orderService.getList(query);

    this.list.hookToQuery(orderStreamCreator).subscribe((response) => {
      this.order = response;
    });
  }



}
