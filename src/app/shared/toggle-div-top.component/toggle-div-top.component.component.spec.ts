import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleDivTopComponentComponent } from './toggle-div-top.component.component';

describe('ToggleDivTopComponentComponent', () => {
  let component: ToggleDivTopComponentComponent;
  let fixture: ComponentFixture<ToggleDivTopComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleDivTopComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleDivTopComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
