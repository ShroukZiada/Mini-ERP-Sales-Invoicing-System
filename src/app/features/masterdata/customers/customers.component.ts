import { Component, inject, OnInit } from '@angular/core';
import { SharedTable } from "../../../shared/shared-table/shared-table";
import { CustomerService } from '../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';
import { AddEditCustomers } from './add-edit-customers/add-edit-customers';
import { SharedDeleteComponent } from '../../../shared/shared-delete/shared-delete.component';
import { Customer } from '../../../core/models/customer';
import { ViewCustomersComponent } from './view-customers/view-customers.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrls: ['./customers.component.css'],
  imports: [SharedTable, SharedModule],
  providers: [CustomerService]

})
export class CustomersComponent implements OnInit {

  private _customerService = inject(CustomerService);
  private _dialog = inject(MatDialog);

  customers: any[] = [];
  columns = [
    { header: 'Id', field: 'id' },
    { header: 'الاسم', field: 'name' },
    { header: 'البريد الإلكتروني', field: 'serial' },
    { header: 'الهاتف', field: 'phone' },
    { header: 'البريد الإلكتروني', field: 'email' },
    { header: 'العنوان', field: 'address' },
    { header: 'الرقم القومي', field: 'nationalId' },
    { header: 'اسم المسؤول', field: 'responsableManName' },
    { header: 'ملاحظات', field: 'notes' },
    { header: 'عميل', field: 'isCustomer' },
    { header: 'مورد', field: 'isSupplier' }
  ]
  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this._customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res
        console.log(this.customers);

      },
      error: (err) => console.error(err)
    });
  }

  addCustomer(customer: any) {
    const dialogRef = this._dialog.open(AddEditCustomers, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      data: {},
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCustomers();
      }
    });
  }

  updateCustomer(row: any) {
    const dialogRef = this._dialog.open(AddEditCustomers, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      data: {
        customerData: row,
        customerId: row.id
      },
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCustomers();
      }
    });
  }

  deleteCustomer(customer: any) {
    const dialogRef = this._dialog.open(SharedDeleteComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      data: {},
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this._customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            console.log('Customer deleted', customer.id);
            this.getAllCustomers();
          },
          error: (err) => console.error('Delete failed', err)
        });
      }
    });
  }

  ViewCustomer(row: any) {
    const dialogRef = this._dialog.open(ViewCustomersComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      data: {
        customerData: row,
        customerId: row.id
      },
      panelClass: 'custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCustomers();
      }
    });
  }
}


