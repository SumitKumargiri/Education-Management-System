import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdattendanceComponent } from './stdattendance.component';

describe('StdattendanceComponent', () => {
  let component: StdattendanceComponent;
  let fixture: ComponentFixture<StdattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StdattendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
