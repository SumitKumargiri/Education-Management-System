import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterContactComponent } from './outer-contact.component';

describe('OuterContactComponent', () => {
  let component: OuterContactComponent;
  let fixture: ComponentFixture<OuterContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuterContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OuterContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
