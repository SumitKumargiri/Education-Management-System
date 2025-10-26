import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherloginComponent } from './teacherlogin.component';

describe('TeacherloginComponent', () => {
  let component: TeacherloginComponent;
  let fixture: ComponentFixture<TeacherloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
