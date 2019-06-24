import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureContentsComponent } from './lecture-contents.component';

describe('LectureContentsComponent', () => {
  let component: LectureContentsComponent;
  let fixture: ComponentFixture<LectureContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
