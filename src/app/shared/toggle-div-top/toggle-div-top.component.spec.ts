import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleDivTopComponent } from './toggle-div-top.component';

describe('ToggleDivTopComponent', () => {
  let component: ToggleDivTopComponent;
  let fixture: ComponentFixture<ToggleDivTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleDivTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleDivTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
