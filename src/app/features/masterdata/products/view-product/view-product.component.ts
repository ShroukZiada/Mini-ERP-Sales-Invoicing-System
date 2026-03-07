import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToggleDivTopComponent } from '../../../../shared/toggle-div-top/toggle-div-top.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ToggleDivTopComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
  providers: [ProductService]

})
export class ViewProductComponent implements OnInit {
  protecteList: any;
  productId: number = 0;
  tabs: any[] = [];
  private _activatedRoute = inject(ActivatedRoute);
  private _ProductService = inject(ProductService);

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      console.log(this.productId);
    });
    this.GetProductById();
    this.getTaps();

  }

  GetProductById() {
    this._ProductService.getProductById(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.protecteList = res;
      }
    });
  }

  getTaps() {
    this.tabs = [
      { name: 'basicDataTemplate' },
      { name: 'permissions' },
      { name: 'itemPriceTemplate' },
      { name: 'itemInfoTemplate' },
    ];
  }
}
