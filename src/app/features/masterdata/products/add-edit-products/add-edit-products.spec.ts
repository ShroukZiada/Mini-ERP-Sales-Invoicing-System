import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProducts } from './add-edit-products';

describe('AddEditProducts', () => {
  let component: AddEditProducts;
  let fixture: ComponentFixture<AddEditProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
