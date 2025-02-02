import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplepopupComponent } from './samplepopup.component';

describe('SamplepopupComponent', () => {
  let component: SamplepopupComponent;
  let fixture: ComponentFixture<SamplepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamplepopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SamplepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
