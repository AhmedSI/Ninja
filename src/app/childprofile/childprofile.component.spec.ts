import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildprofileComponent } from './childprofile.component';

describe('ChildprofileComponent', () => {
  let component: ChildprofileComponent;
  let fixture: ComponentFixture<ChildprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
