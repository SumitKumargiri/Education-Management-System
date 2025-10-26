import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecourseComponent } from './updatecourse.component';

describe('UpdatecourseComponent', () => {
  let component: UpdatecourseComponent;
  let fixture: ComponentFixture<UpdatecourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatecourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
