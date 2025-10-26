import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsidebarComponent } from './studentsidebar.component';

describe('StudentsidebarComponent', () => {
  let component: StudentsidebarComponent;
  let fixture: ComponentFixture<StudentsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
