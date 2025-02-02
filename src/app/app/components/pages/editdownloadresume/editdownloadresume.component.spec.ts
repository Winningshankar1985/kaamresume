import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdownloadresumeComponent } from './editdownloadresume.component';

describe('EditdownloadresumeComponent', () => {
  let component: EditdownloadresumeComponent;
  let fixture: ComponentFixture<EditdownloadresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditdownloadresumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditdownloadresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
