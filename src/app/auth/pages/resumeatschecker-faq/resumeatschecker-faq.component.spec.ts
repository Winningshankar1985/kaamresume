import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeatscheckerFAQComponent } from './resumeatschecker-faq.component';

describe('ResumeatscheckerFAQComponent', () => {
  let component: ResumeatscheckerFAQComponent;
  let fixture: ComponentFixture<ResumeatscheckerFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeatscheckerFAQComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeatscheckerFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
