import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysetoolpageComponent } from './analysetoolpage.component';

describe('AnalysetoolpageComponent', () => {
  let component: AnalysetoolpageComponent;
  let fixture: ComponentFixture<AnalysetoolpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysetoolpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysetoolpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
