import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedTable } from './shared-table/shared-table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleDivTopComponentComponent } from './toggle-div-top.component/toggle-div-top.component.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, SharedTable, ReactiveFormsModule, ToggleDivTopComponentComponent],
})
export class SharedModule { }
