import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeatscheckerComponent } from './resumeatschecker.component';

describe('ResumeatscheckerComponent', () => {
  let component: ResumeatscheckerComponent;
  let fixture: ComponentFixture<ResumeatscheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeatscheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeatscheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
