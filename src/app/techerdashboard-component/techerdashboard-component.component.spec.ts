import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecherdashboardComponentComponent } from './techerdashboard-component.component';

describe('TecherdashboardComponentComponent', () => {
  let component: TecherdashboardComponentComponent;
  let fixture: ComponentFixture<TecherdashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecherdashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecherdashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
