import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SharedTable } from '../../../shared/shared-table/shared-table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedTable,
    HttpClientModule
  ]
})
export class SalesModule { }
