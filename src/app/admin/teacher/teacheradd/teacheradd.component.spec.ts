import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheraddComponent } from './teacheradd.component';

describe('TeacheraddComponent', () => {
  let component: TeacheraddComponent;
  let fixture: ComponentFixture<TeacheraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacheraddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacheraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
