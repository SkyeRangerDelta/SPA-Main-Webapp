import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbHandlerService } from '../services/db-handler-service';
import { Notice } from '../TypeDefs';
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
      this.dbService.getNoticeById(id).subscribe({
        next: (notice: Notice | null) => {
          this.notice = notice;
          this.loading = false;
          if (!notice) this.error = 'Notice not found.';
        },
        error: () => {
          this.error = 'Error loading notice.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid notice ID.';
      this.loading = false;
    }
  }
}
