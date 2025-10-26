import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentsmarksComponent } from './addstudentsmarks.component';

describe('AddstudentsmarksComponent', () => {
  let component: AddstudentsmarksComponent;
  let fixture: ComponentFixture<AddstudentsmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddstudentsmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddstudentsmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
