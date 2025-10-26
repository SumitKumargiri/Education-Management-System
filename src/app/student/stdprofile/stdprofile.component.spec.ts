import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdprofileComponent } from './stdprofile.component';

describe('StdprofileComponent', () => {
  let component: StdprofileComponent;
  let fixture: ComponentFixture<StdprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StdprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
