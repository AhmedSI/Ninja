import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeSearchComponent } from './alternative-search.component';

describe('AlternativeSearchComponent', () => {
  let component: AlternativeSearchComponent;
  let fixture: ComponentFixture<AlternativeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
