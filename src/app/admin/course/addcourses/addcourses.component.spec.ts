import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursesComponent } from './addcourses.component';

describe('AddcoursesComponent', () => {
  let component: AddcoursesComponent;
  let fixture: ComponentFixture<AddcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
