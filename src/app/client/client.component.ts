import { Component ,OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagingService } from '../services/messaging.service';
import { ClientService, ClientDto,clientTypeOptions } from '@proxy/clients';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ClientComponent implements OnInit {
  client = { items: [], totalCount: 0 } as PagedResultDto<ClientDto>;
  form: FormGroup;
  selectedClient = {} as ClientDto;
  isModalOpen = false;
  clientTypes = clientTypeOptions;

  constructor(
    public readonly list: ListService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private messagingService: MessagingService
  ) {
    
  }

  ngOnInit(): void {
    const clientStreamCreator = (query) => this.clientService.getList(query);

    this.list.hookToQuery(clientStreamCreator).subscribe((response) => {
      this.client = response;
    });
  }


}
