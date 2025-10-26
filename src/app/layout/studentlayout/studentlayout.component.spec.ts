import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlayoutComponent } from './studentlayout.component';

describe('StudentlayoutComponent', () => {
  let component: StudentlayoutComponent;
  let fixture: ComponentFixture<StudentlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
