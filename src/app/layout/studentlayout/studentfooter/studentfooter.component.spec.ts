import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfooterComponent } from './studentfooter.component';

describe('StudentfooterComponent', () => {
  let component: StudentfooterComponent;
  let fixture: ComponentFixture<StudentfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
