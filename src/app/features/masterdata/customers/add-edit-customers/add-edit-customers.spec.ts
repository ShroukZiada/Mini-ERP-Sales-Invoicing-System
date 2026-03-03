import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomers } from './add-edit-customers';

describe('AddEditCustomers', () => {
  let component: AddEditCustomers;
  let fixture: ComponentFixture<AddEditCustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCustomers],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditCustomers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
