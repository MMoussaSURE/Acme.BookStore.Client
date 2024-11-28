import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    NgbDatepickerModule
  ]
})
export class ClientModule { }
