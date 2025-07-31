import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbHandlerService } from '../services/db-handler-service';
import { Notice, NoticeRes } from '../TypeDefs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-notice-article',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './notice-article.html',
  styleUrl: './notice-article.scss'
})
export class NoticeArticle {
  notice: Notice | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private dbService: DbHandlerService) {
    console.log('NoticeArticle component initialized');

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dbService.getNoticeById(id).subscribe( (noticeRes: NoticeRes) => {
        if ( !noticeRes.success || !noticeRes || !noticeRes.notice ) {
          console.error('Error fetching notice:', noticeRes.message);
          this.error = 'Notice not found.';
          this.loading = false;
        }
      } );
    } else {
      this.error = 'Invalid notice ID.';
      this.loading = false;
    }
  }
}
