import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterHomeComponent } from './outer-home.component';

describe('OuterHomeComponent', () => {
  let component: OuterHomeComponent;
  let fixture: ComponentFixture<OuterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuterHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OuterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
