import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterlayoutComponent } from './outerlayout.component';

describe('OuterlayoutComponent', () => {
  let component: OuterlayoutComponent;
  let fixture: ComponentFixture<OuterlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuterlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OuterlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
