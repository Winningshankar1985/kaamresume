import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesPageComponent } from './queries-page.component';

describe('QueriesPageComponent', () => {
  let component: QueriesPageComponent;
  let fixture: ComponentFixture<QueriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueriesPageComponent]
    });
    fixture = TestBed.createComponent(QueriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
