import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { SharedModule } from '../../../shared/shared-module';
import { SharedTable } from '../../../shared/shared-table/shared-table';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedDeleteComponent } from '../../../shared/shared-delete/shared-delete.component';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [SharedTable, SharedModule],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  // ! Injects
  private _router = inject(Router);
  private _CDR = inject(ChangeDetectorRef);
  private _ProductService = inject(ProductService);
  private _FB = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  products: any[] = [];
  columns = [
    { header: 'الكود', field: 'id' },
    { header: 'اسم الصنف', field: 'name' },
    { header: 'الباركود', field: 'barcode' },
    { header: 'التصنيف', field: 'categoryName' },
    { header: 'سعر البيع', field: 'salePrice' },
    { header: 'سعر الشراء', field: 'purchasePrice' },
    { header: 'الكمية', field: 'minQuantity' }
  ];
  constructor() { }
  ngOnInit() {
    this.GetAllProduct();
  }
  protecteList: any[] = []

  GetAllProduct() {
    this._ProductService.getProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.protecteList = res
      },
    })
  }

  addprodect() {
    this._router.navigate(['/masterdata/Products/add']);
  }

  deleteprodect(product: any) {
    const dialogRef = this._dialog.open(SharedDeleteComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      data: {},
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this._ProductService.deleteProduct(product.id).subscribe({
          next: () => {
            console.log('product deleted', product.id);
            this.GetAllProduct();
          },
          error: (err) => console.error('Delete failed', err)
        });
      }
    });
  }

  Viewprodect(product: any) {
    this._router.navigate(['/masterdata/Products/view', product.id]);
  }
  updateprodect(product: any) {
    this._router.navigate(['/masterdata/Products/edit', product.id]);

  }

}
