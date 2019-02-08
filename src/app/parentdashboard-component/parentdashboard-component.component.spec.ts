import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentdashboardComponentComponent } from './parentdashboard-component.component';

describe('ParentdashboardComponentComponent', () => {
  let component: ParentdashboardComponentComponent;
  let fixture: ComponentFixture<ParentdashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentdashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentdashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
