import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminheaderbarComponent } from './adminheaderbar.component';

describe('AdminheaderbarComponent', () => {
  let component: AdminheaderbarComponent;
  let fixture: ComponentFixture<AdminheaderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminheaderbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminheaderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
