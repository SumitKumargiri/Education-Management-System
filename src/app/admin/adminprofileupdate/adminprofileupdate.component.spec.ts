import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprofileupdateComponent } from './adminprofileupdate.component';

describe('AdminprofileupdateComponent', () => {
  let component: AdminprofileupdateComponent;
  let fixture: ComponentFixture<AdminprofileupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminprofileupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminprofileupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
