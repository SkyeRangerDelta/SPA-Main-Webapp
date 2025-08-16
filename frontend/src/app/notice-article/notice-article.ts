import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DbHandlerService } from '../services/db-handler-service';
import { Notice, NoticeRes } from '../TypeDefs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-notice-article',
  imports: [
    NgTemplateOutlet,
    RouterLink
  ],
  templateUrl: './notice-article.html',
  styleUrl: './notice-article.scss'
})
export class NoticeArticle {
  notice: Notice | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private dbService: DbHandlerService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dbService.getNoticeById(id).subscribe( (noticeRes: NoticeRes) => {
        if ( !noticeRes.notice ) {
          this.error = 'Notice not found.';
          this.loading = false;
        }
        else if ( !noticeRes.success || !noticeRes ) {
          console.error('Error fetching notice:', noticeRes.message);
          this.error = 'Notice not found.';
          this.loading = false;
        }
        else {
          this.notice = noticeRes.notice;
          this.loading = false;
        }
      } );
    } else {
      this.error = 'Invalid notice ID.';
      this.loading = false;
    }
  }
}
