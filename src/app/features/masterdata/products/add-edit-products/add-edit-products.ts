import { Component, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { ToggleDivTopComponentComponent } from '../../../../shared/toggle-div-top.component/toggle-div-top.component.component';
import { ToggleDivTopComponent } from '../../../../shared/toggle-div-top/toggle-div-top.component';
import { MatOption, MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-products',
  imports: [CommonModule, SharedModule, ReactiveFormsModule,
    MatOption, ToggleDivTopComponent, MatOptionModule],
  standalone: true,
  templateUrl: './add-edit-products.html',
  styleUrl: './add-edit-products.css',
  providers: [ProductService]

})
export class AddEditProducts implements OnInit {


  // * inject
  private _FB = inject(FormBuilder);
  private _router = inject(Router);
  private _ProductService = inject(ProductService);
  private _activatedRoute = inject(ActivatedRoute);
  _itemId: number = 0
  productId!: number;

  //! property
  constructor() { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      console.log('Product ID:', this.productId);

      if (this.productId && this.productId > 0) {
        this.GetProductById();
      }
    });

    this.getTaps();
  }

  //! Item Card Forms
  // Basic Item Card  DAta  form
  itemCardBaiscForm: FormGroup = this._FB.group({
    name: this._FB.control(null, Validators.required),
    serial: this._FB.control(null),
    barcode: this._FB.control(''),
    shortCode: this._FB.control(''),
    categoryId: this._FB.control(null, Validators.required),
    minQuantity: this._FB.control(0, Validators.min(0)),
    maxQuantity: this._FB.control(0, Validators.min(0)),
    maxDiscountPercentage: this._FB.control(0, Validators.min(0)),
    canUseItem: this._FB.control(true),
    hasExpireDate: this._FB.control(false),
    isMakeFromManyItems: this._FB.control(false),
    allowReturn: this._FB.control(true),
    isStoreItem: this._FB.control(true),
    canUseDollar: this._FB.control(false),
    saleUnitId: this._FB.control(null, Validators.required),
    purchaseUnitId: this._FB.control(null, Validators.required),
    id: this._FB.control(0),
  });
  //  Item Card  Data Price  form
  itemPriceForm: FormGroup = this._FB.group({
    salePrice: this._FB.control(0, Validators.min(0)),
    purchasePrice: this._FB.control(0, Validators.min(0)),
    wholesalePrice: this._FB.control(0, Validators.min(0)),
    halfWholesalePrice: this._FB.control(0, Validators.min(0)),
    profitMarginPercentage: this._FB.control(0, Validators.min(0)),
    profitMarginValue: this._FB.control(0, Validators.min(0)),
    points: this._FB.control(0),
  });

  //  Item Card  Data Price  form
  itemInfoForm: FormGroup = this._FB.group({
    commercialName: this._FB.control(''),
    originCountry: this._FB.control(''),
    model: this._FB.control(''),
    marka: this._FB.control(''),
    size: this._FB.control(''),
    color: this._FB.control(''),
    year: this._FB.control(''),
    itemHasEmptyBow: this._FB.control(true),
    showingArrangement: this._FB.control(0),
    description: this._FB.control(''),
  });

  tabs: any[] = [];
  protecteListPatch: any
  GetProductById() {
    this._ProductService.getProductById(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.protecteListPatch = res;
        this.loadProductData(this.protecteListPatch)
      }
    });
  }


  loadProductData(product: any) {
    // Patch basic form
    this.itemCardBaiscForm.patchValue({
      name: product.name,
      serial: product.serial,
      barcode: product.barcode,
      shortCode: product.shortCode,
      categoryId: product.categoryId,
      minQuantity: product.minQuantity,
      maxQuantity: product.maxQuantity,
      maxDiscountPercentage: product.maxDiscountPercentage,
      canUseItem: product.canUseItem,
      hasExpireDate: product.hasExpireDate,
      isMakeFromManyItems: product.isMakeFromManyItems,
      allowReturn: product.allowReturn,
      isStoreItem: product.isStoreItem,
      canUseDollar: product.canUseDollar,
      saleUnitId: product.saleUnitId,
      purchaseUnitId: product.purchaseUnitId,
      id: product.id
    });

    // Patch price form
    this.itemPriceForm.patchValue({
      salePrice: product.salePrice,
      purchasePrice: product.purchasePrice,
      wholesalePrice: product.wholesalePrice,
      halfWholesalePrice: product.halfWholesalePrice,
      profitMarginPercentage: product.profitMarginPercentage,
      profitMarginValue: product.profitMarginValue,
      points: product.points
    });

    // Patch info form
    this.itemInfoForm.patchValue({
      commercialName: product.commercialName,
      originCountry: product.originCountry,
      model: product.model,
      marka: product.marka,
      size: product.size,
      color: product.color,
      year: product.year,
      itemHasEmptyBow: product.itemHasEmptyBow,
      showingArrangement: product.showingArrangement,
      description: product.description
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




  PurchaseUnit: any[] = [
    { id: 1, name: 'كيلو' },
    { id: 2, name: 'كرتونة' },
    { id: 3, name: 'لتر' },
    { id: 4, name: 'قطعة' },
  ]

  saleUnit: any[] = [
    { id: 1, name: 'كيلو' },
    { id: 2, name: 'كرتونه' },
    { id: 3, name: 'لتر' },
    { id: 4, name: 'قطعة' },
  ]

  categoryList: any[] = [
    { id: 1, name: 'موبيلات' },
    { id: 2, name: 'لحوم و دواجن' },
    { id: 3, name: 'اصناف اخري' },
  ]
  onSubmit() {
    const payload = {
      ... this.itemCardBaiscForm.value,
      ...this.itemPriceForm.value,
      ...this.itemInfoForm.value,
      id: this.productId
    }
    if (this.productId) {
      this._ProductService.updateProduct(payload).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      })
    } else {
      this._ProductService.addProduct(payload).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }



  }
  close() { }
}
