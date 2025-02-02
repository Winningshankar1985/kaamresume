import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsV2Component } from './payments-v2.component';

describe('PaymentsV2Component', () => {
  let component: PaymentsV2Component;
  let fixture: ComponentFixture<PaymentsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
