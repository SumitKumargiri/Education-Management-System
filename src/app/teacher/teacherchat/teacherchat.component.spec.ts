import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherchatComponent } from './teacherchat.component';

describe('TeacherchatComponent', () => {
  let component: TeacherchatComponent;
  let fixture: ComponentFixture<TeacherchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherchatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
