import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishedCoursesComponent } from './accomplished-courses.component';

describe('AccomplishedCoursesComponent', () => {
  let component: AccomplishedCoursesComponent;
  let fixture: ComponentFixture<AccomplishedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
