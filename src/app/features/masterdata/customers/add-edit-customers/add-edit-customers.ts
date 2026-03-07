import { ChangeDetectorRef, Component, EventEmitter, Inject, inject, Input, OnInit, Optional, Output, signal, WritableSignal } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedTable } from '../../../../shared/shared-table/shared-table';
import { ToggleDivTopComponentComponent } from '../../../../shared/toggle-div-top.component/toggle-div-top.component.component';
import { Customer } from '../../../../core/models/customer';
import { BidiModule } from "@angular/cdk/bidi";

@Component({
  selector: 'app-add-edit-customers',
  imports: [CommonModule, SharedTable, ReactiveFormsModule, HttpClientModule, ToggleDivTopComponentComponent, BidiModule],
  standalone: true,
  templateUrl: './add-edit-customers.html',
  styleUrl: './add-edit-customers.css',
  providers: [CustomerService]

})

export class AddEditCustomers implements OnInit {
  private _router = inject(Router);
  private _customerService = inject(CustomerService);
  private _dialog = inject(MatDialog);
  private _FB = inject(FormBuilder);

  // ? lifeCycle Hooks
  constructor(
    @Optional() private dialogRef: MatDialogRef<AddEditCustomers>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  //! property
  tabs!: any[];
  editMode: WritableSignal<boolean> = signal(false);
  @Input() isDialog = false;
  @Output() dialogClose = new EventEmitter<boolean>();
  customerList!: Customer;
  _customerId: number = 0
  customerForm!: FormGroup
  ngOnInit(): void {
    this.customerList = this.data.customerData
    this._customerId = this.data.customerId
    // تقدر تضبط اللغة الإفتراضية
    this.customerForm = this._FB.group({
      name: ['', Validators.required],
      serial: ['', Validators.required],
      phone: ['', Validators.pattern(/^$|^01[0125][0-9]{8}$/)],
      email: ['', Validators.email],
      address: [''],
      nationalId: ['', Validators.pattern(/^$|^[0-9]{14}$/)],
      responsableManName: [''],
      notes: [''],
      isCustomer: [true], // IMPOpRTANT
      isSupplier: [false],
    });
    this.patchCustmerData(this.customerList)
  }


  patchCustmerData(data: any) {
    this.customerForm.patchValue({
      name: data.name,
      serial: data.serial,
      phone: data.phone,
      email: data.email,
      address: data.address,
      nationalId: data.nationalId,
      responsableManName: data.responsableManName,
      notes: data.notes,
      isCustomer: data.isCustomer,
      isSupplier: data.isSupplier,
    })
  }


  handleClose() {
    if (this.isDialog) {
      this.dialogClose.emit(false);
    } else {
      this.close();
    }
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    } else {
      this._router.navigate(['/cashier/customers']);
    }
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      if (this._customerId) {
        const updatedCustomer = { id: this._customerId, ...customerData };

        this._customerService.updateCustomer(updatedCustomer).subscribe({
          next: (res) => {
            console.log('Customer updated', res);
            this.editMode.set(false);
            this.handleClose();
          },
          error: (err) => console.error(err)
        });

      } else {
        this._customerService.addCustomer(customerData).subscribe({
          next: (res) => {
            console.log('Customer added', res);
            this.handleClose();
          },
          error: (err) => console.error(err)
        });
      }
    }
  }

}
