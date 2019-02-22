import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdahboardComponent } from './quizdahboard.component';

describe('QuizdahboardComponent', () => {
  let component: QuizdahboardComponent;
  let fixture: ComponentFixture<QuizdahboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizdahboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizdahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
