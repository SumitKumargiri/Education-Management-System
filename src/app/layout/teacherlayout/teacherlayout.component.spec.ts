import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherlayoutComponent } from './teacherlayout.component';

describe('TeacherlayoutComponent', () => {
  let component: TeacherlayoutComponent;
  let fixture: ComponentFixture<TeacherlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
