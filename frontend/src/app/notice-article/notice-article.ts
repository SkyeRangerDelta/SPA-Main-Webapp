import { Component } from '@angular/core';
        import { ActivatedRoute } from '@angular/router';
        import { DbHandlerService } from '../services/db-handler-service';
        import { Notice, NoticeRes } from '../TypeDefs';
        import { NgTemplateOutlet } from '@angular/common';
        import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
        import { marked } from 'marked';

        // interface paragraph {
        //   id: number;
        //   text: SafeHtml;
        // }

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
          // noticeParagraphs: { id: number; text: SafeHtml }[] = [];
          noticeContent: SafeHtml | null = null;

          constructor(
            private route: ActivatedRoute,
            private dbService: DbHandlerService,
            private sanitizer: DomSanitizer
          ) {
            const id = Number(this.route.snapshot.paramMap.get('id'));
            if (id) {
              this.dbService.getNoticeById(id).subscribe(async (noticeRes: NoticeRes) => {
                if (!noticeRes.notice) {
                  this.error = 'Notice not found.';
                  this.loading = false;
                } else if (!noticeRes.success || !noticeRes) {
                  console.error('Error fetching notice:', noticeRes.message);
                  this.error = 'Notice not found.';
                  this.loading = false;
                } else {
                  this.notice = noticeRes.notice;
                  // Wait for all paragraphs to be processed before setting loading to false
                  this.noticeContent = await this.convertDiscordToHtml( this.notice.content )
                  this.loading = false;
                }
              });
            } else {
              this.error = 'Invalid notice ID.';
              this.loading = false;
            }
          }

          async convertDiscordToHtml(text: string): Promise<SafeHtml> {
            return this.sanitizer.bypassSecurityTrustHtml(await marked.parse(text));
          }
        }
