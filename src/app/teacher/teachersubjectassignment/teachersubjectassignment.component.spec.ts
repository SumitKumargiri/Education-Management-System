import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersubjectassignmentComponent } from './teachersubjectassignment.component';

describe('TeachersubjectassignmentComponent', () => {
  let component: TeachersubjectassignmentComponent;
  let fixture: ComponentFixture<TeachersubjectassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachersubjectassignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersubjectassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
