import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomdashboardComponentComponent } from './classroomdashboard-component.component';

describe('ClassroomdashboardComponentComponent', () => {
  let component: ClassroomdashboardComponentComponent;
  let fixture: ComponentFixture<ClassroomdashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomdashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomdashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
