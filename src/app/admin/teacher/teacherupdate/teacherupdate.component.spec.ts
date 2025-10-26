import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherupdateComponent } from './teacherupdate.component';

describe('TeacherupdateComponent', () => {
  let component: TeacherupdateComponent;
  let fixture: ComponentFixture<TeacherupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
