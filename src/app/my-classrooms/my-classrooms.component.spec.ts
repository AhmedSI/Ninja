import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassroomsComponent } from './my-classrooms.component';

describe('MyClassroomsComponent', () => {
  let component: MyClassroomsComponent;
  let fixture: ComponentFixture<MyClassroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClassroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
