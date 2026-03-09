import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice, InvoiceService } from '../../../../core/services/invoice.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { ProductService } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { BidiModule } from "@angular/cdk/bidi";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-create',
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatIconModule],
  standalone: true,
  templateUrl: './invoice-create.html',
  styleUrls: ['./invoice-create.css'],
  providers: [InvoiceService]

})
export class InvoiceCreate implements OnInit {
  invoiceForm!: FormGroup;
  customers: any[] = [];
  products: any[] = [];
  invoiceLinesList: any[] = []; // لتخزين بيانات الفاتورة للعرض
  isEditMode: boolean = false;
  editIndex: number | null = null;
  // * inject
  private _FB = inject(FormBuilder);
  private _router = inject(Router);
  private _InvoiceService = inject(InvoiceService);
  private _CustomerService = inject(CustomerService);
  // private _ProductService = inject(ProductService);

  private _activatedRoute = inject(ActivatedRoute);



  ngOnInit() {
    this.invoiceForm = this._FB.group({
      items: this._FB.array([this.createEmptyLine()])
    });

  }

  get invoiceLines(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createEmptyLine(): FormGroup {
    return this._FB.group({
      itemId: [null, Validators.required],       // صنف
      itemName: [''],                             // اسم الصنف للعرض فقط
      price: [0, Validators.required],           // سعر الوحدة
      quantity: [0, Validators.required],        // الكمية
      discountIsPercentage: [false],             // هل الخصم نسبة؟
      discountPercentage: [0],                    // نسبة الخصم
      valueDifference: [0],                       // فرق القيمة
      totalSales: [0],                            // إجمالي المبيعات
      totalDiscount: [0],                         // إجمالي الخصم
      totalNet: [0],                              // الصافي
      originalPrice: [0]                          // السعر الأصلي للصنف
    });
  }
  addlineToInvoice() {
    const currentIndex = this.invoiceLines.length - 1;
    const currentLine = this.invoiceLines.at(currentIndex);
    console.log(this.invoiceLinesList);

    if (currentLine.get('itemId')?.value) {
      const lineValue = currentLine.value;

      // استخدام == لتجنب مشكلة النوع
      const selectedItem = this.itemoption.find(it => it.itemId == lineValue.itemId);
      const itemName = selectedItem?.name || '';

      const newLine = {
        ...lineValue,
        itemName: itemName
      };

      // حفظ في view
      this.invoiceLinesList.push(newLine);

      // إعادة تعيين الانبوت
      currentLine.reset({
        itemId: null,
        itemName: '',
        price: 0,
        quantity: 1,
        discountIsPercentage: false,
        discountPercentage: 0,
        valueDifference: 0,
        totalSales: 0,
        totalDiscount: 0,
        totalNet: 0,
        originalPrice: 0
      });

      this.calculateLine(currentIndex);
    } else {
      alert('الرجاء اختيار صنف قبل إضافة صف جديد');
    }
  }



  // عند الضغط تعديل، الداتا تنزل للـ inputs
  editLine(index: number) {
    const line = this.invoiceLinesList[index];

    // نزّل البيانات في الانبوت الوحيد
    this.invoiceLines.at(0).patchValue({
      itemId: line.itemId,
      price: line.price,
      quantity: line.quantity,
      discountIsPercentage: line.discountIsPercentage,
      discountPercentage: line.discountPercentage,
      originalPrice: line.originalPrice
    });

    // احذف الصف من view مؤقتاً
    this.invoiceLinesList.splice(index, 1);
    this.editIndex = index;
    this.isEditMode = true;
    // احسب القيم
    this.calculateLine(0);
  }

  // حذف صف
  deleteLineFromInvoice(index: number) {
    this.invoiceLines.removeAt(index);
    this.invoiceLinesList.splice(index, 1);
  } removeLine(index: number) {
    this.invoiceLines.removeAt(index);
  }

  updateLine() {

    const row = this.invoiceLines.at(0).value;

    const selectedItem = this.itemoption
      .find(x => x.itemId == row.itemId);

    const updatedLine = {
      ...row,
      itemName: selectedItem?.name
    };

    if (this.editIndex !== null) {
      this.invoiceLinesList[this.editIndex] = updatedLine;
    }

    this.isEditMode = false;
    this.editIndex = null;

    this.invoiceLines.at(0).reset({
      itemId: null,
      price: 0,
      quantity: 1,
      discountIsPercentage: false,
      discountPercentage: 0,
      valueDifference: 0,
      totalSales: 0,
      totalDiscount: 0,
      totalNet: 0,
      originalPrice: 0
    });

  }

  // دالة لحساب كل القيم في الصف
  calculateLine(i: number) {

    const row = this.invoiceLines.at(i);

    const price = row.get('price')?.value || 0;
    const quantity = row.get('quantity')?.value || 0;
    const discountPercentage = row.get('discountPercentage')?.value || 0;
    const isPercentage = row.get('discountIsPercentage')?.value;
    const originalPrice = row.get('originalPrice')?.value || price;

    const totalSales = price * quantity;
    const totalDiscount = isPercentage ? totalSales * (discountPercentage / 100) : discountPercentage;
    const totalNet = totalSales - totalDiscount;
    const valueDifference = (originalPrice - price) * quantity;

    row.patchValue({ totalSales, totalDiscount, totalNet, valueDifference });
  }

  sanitizeNumberInput(event: any, rowIndex: number, controlName: string) {
    let value = event.target.value;

    // إزالة أي صفر بادئ أو قيم سالبة
    if (!value || Number(value) <= 0) {
      value = '';
    } else {
      // إزالة أي صفر بادئ مثل "05" تصبح "5"
      value = String(Number(value));
    }

    // تحديث الفورم والـ DOM
    this.invoiceLines.at(rowIndex).get(controlName)?.setValue(value, { emitEvent: false });
    event.target.value = value;

    this.calculateLine(rowIndex); // إعادة الحساب
  }

  onItemChange(i: number) {
    const selected = this.itemoption.find(it => it.itemId == this.invoiceLines.at(i).get('itemId')?.value);
    this.invoiceLines.at(i).patchValue({
      originalPrice: selected?.originalPrice || 0,
      price: selected?.originalPrice || 0
    });
    this.calculateLine(i);
  }

  // دوال الإجماليات
  getTotalSales() {
    return this.invoiceLines.controls.reduce((sum, row) => sum + (row.get('totalSales')?.value || 0), 0);
  }

  getTotalDiscount() {
    return this.invoiceLines.controls.reduce((sum, row) => sum + (row.get('totalDiscount')?.value || 0), 0);
  }

  getTotalNet() {
    return this.invoiceLines.controls.reduce((sum, row) => sum + (row.get('totalNet')?.value || 0), 0);
  }

  getTotalValueDifference() {
    return this.invoiceLines.controls.reduce((sum, row) => sum + (row.get('valueDifference')?.value || 0), 0);
  }


  itemoption = [
    { itemId: 1, name: "موبيل شاومي", originalPrice: 1000 },
    { itemId: 2, name: "جبنة رومي", originalPrice: 50 },
    { itemId: 3, name: "عصير برتقال", originalPrice: 20 },
    { itemId: 4, name: "طماطم", originalPrice: 10 },
  ];
  saveInvoice() {

  }
}
