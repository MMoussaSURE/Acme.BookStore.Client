import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { authGuard, permissionGuard } from '@abp/ng.core';

const routes: Routes = [{ path: '', component: OrderComponent, canActivate: [authGuard, permissionGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
