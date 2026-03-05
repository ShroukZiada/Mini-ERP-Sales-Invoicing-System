import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../../../shared/shared-module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

  imports: [
    CommonModule,
    CustomersComponent,
    HttpClientModule,

  ]


})
export class CustomersModule { }
