import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBlurb } from './notice-blurb';

describe('NoticeBlurb', () => {
  let component: NoticeBlurb;
  let fixture: ComponentFixture<NoticeBlurb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeBlurb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeBlurb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
