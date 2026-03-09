import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { SharedTable } from '../../../../shared/shared-table/shared-table';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [SharedTable, SharedModule],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList { }
