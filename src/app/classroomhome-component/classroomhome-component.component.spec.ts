import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomhomeComponentComponent } from './classroomhome-component.component';

describe('ClassroomhomeComponentComponent', () => {
  let component: ClassroomhomeComponentComponent;
  let fixture: ComponentFixture<ClassroomhomeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomhomeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomhomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
