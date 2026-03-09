import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice.service';
import { SharedModule } from '../../../shared/shared-module';
import { SharedTable } from '../../../shared/shared-table/shared-table';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  standalone: true,
  styleUrls: ['./sales.component.css'],
  imports: [SharedTable, SharedModule],
  providers: [InvoiceService]
})
export class SalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
