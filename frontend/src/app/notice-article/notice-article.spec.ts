import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeArticle } from './notice-article';

describe('NoticeArticle', () => {
  let component: NoticeArticle;
  let fixture: ComponentFixture<NoticeArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
