import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterdataComponent } from './masterdata.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProducts } from './products/add-edit-products/add-edit-products';
import { CustomersComponent } from './customers/customers.component';
import { AddEditCustomers } from './customers/add-edit-customers/add-edit-customers';
import { ViewProductComponent } from './products/view-product/view-product.component';

const routes: Routes = [
 {
  path: '',
  component: MasterdataComponent,
  children: [
   // Products
   { path: 'Products', component: ProductsComponent },
   { path: 'Products/add', component: AddEditProducts },
   { path: 'Products/edit/:id', component: AddEditProducts },
   { path: 'Products/view/:id', component: ViewProductComponent },


   // Customers
   { path: 'customers', component: CustomersComponent },
   { path: 'customers/add', component: AddEditCustomers },
   { path: 'customers/edit/:id', component: AddEditCustomers }
  ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class MasterDataRoutingModule { }