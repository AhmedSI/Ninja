import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursehomeComponentComponent } from './coursehome-component.component';

describe('CoursehomeComponentComponent', () => {
  let component: CoursehomeComponentComponent;
  let fixture: ComponentFixture<CoursehomeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursehomeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursehomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
