import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdsubjectComponent } from './stdsubject.component';

describe('StdsubjectComponent', () => {
  let component: StdsubjectComponent;
  let fixture: ComponentFixture<StdsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StdsubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
