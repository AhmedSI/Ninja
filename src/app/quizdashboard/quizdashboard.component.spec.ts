import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdashboardComponent } from './quizdashboard.component';

describe('QuizdashboardComponent', () => {
  let component: QuizdashboardComponent;
  let fixture: ComponentFixture<QuizdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
