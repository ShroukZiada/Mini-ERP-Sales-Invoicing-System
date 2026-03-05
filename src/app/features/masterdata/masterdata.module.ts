import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterdataComponent } from './masterdata.component';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';
import { AddEditCustomers } from './customers/add-edit-customers/add-edit-customers';
import { CustomersComponent } from './customers/customers.component';
import { AddEditProducts } from './products/add-edit-products/add-edit-products';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MasterDataRoutingModule,
    AddEditProducts,
    MasterdataComponent,
    ProductsComponent,
    CustomersComponent,
    AddEditCustomers,
    HttpClientModule
  ]
})
export class MasterdataModule { }