import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject, OnInit, Optional } from '@angular/core';
import { SharedTable } from '../../../../shared/shared-table/shared-table';
import { ToggleDivTopComponentComponent } from '../../../../shared/toggle-div-top.component/toggle-div-top.component.component';
import { CustomerService } from '../../../../core/services/customer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCustomers } from '../add-edit-customers/add-edit-customers';
import { Customer } from '../../../../core/models/customer';

@Component({
  selector: 'app-view-customers',
  standalone: true,
  imports: [CommonModule, SharedTable, HttpClientModule, ToggleDivTopComponentComponent],
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css',
  providers: [CustomerService]
})
export class ViewCustomersComponent implements OnInit {

  private _dialog = inject(MatDialog);
  customerList!: Customer;
  _customerId: number = 0
  constructor(
    @Optional() private dialogRef: MatDialogRef<AddEditCustomers>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.customerList = this.data.customerData
    this._customerId = this.data.customerId

  }
  handleClose() {
    this.dialogRef.close();
  }


}
