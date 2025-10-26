import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmarksComponent } from './studentmarks.component';

describe('StudentmarksComponent', () => {
  let component: StudentmarksComponent;
  let fixture: ComponentFixture<StudentmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
