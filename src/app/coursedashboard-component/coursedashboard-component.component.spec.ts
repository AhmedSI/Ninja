import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedashboardComponentComponent } from './coursedashboard-component.component';

describe('CoursedashboardComponentComponent', () => {
  let component: CoursedashboardComponentComponent;
  let fixture: ComponentFixture<CoursedashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursedashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursedashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
