import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiquestionsComponent } from './aiquestions.component';

describe('AiquestionsComponent', () => {
  let component: AiquestionsComponent;
  let fixture: ComponentFixture<AiquestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiquestionsComponent]
    });
    fixture = TestBed.createComponent(AiquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
