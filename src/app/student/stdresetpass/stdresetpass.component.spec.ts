import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdresetpassComponent } from './stdresetpass.component';

describe('StdresetpassComponent', () => {
  let component: StdresetpassComponent;
  let fixture: ComponentFixture<StdresetpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StdresetpassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdresetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
