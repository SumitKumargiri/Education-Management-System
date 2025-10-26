import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherfooterComponent } from './teacherfooter.component';

describe('TeacherfooterComponent', () => {
  let component: TeacherfooterComponent;
  let fixture: ComponentFixture<TeacherfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
