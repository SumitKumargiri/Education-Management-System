import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherlistComponent } from './teacherlist.component';

describe('TeacherlistComponent', () => {
  let component: TeacherlistComponent;
  let fixture: ComponentFixture<TeacherlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
