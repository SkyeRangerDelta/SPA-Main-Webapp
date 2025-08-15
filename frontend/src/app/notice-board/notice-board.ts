import { Component } from '@angular/core';
import { DbHandlerService } from '../services/db-handler-service';
import { Notice } from '../TypeDefs';
import { NgTemplateOutlet } from '@angular/common';
import { NoticeBlurb } from '../notice-blurb/notice-blurb';

@Component({
  selector: 'app-notice-board',
  imports: [
    NgTemplateOutlet,
    NoticeBlurb
  ],
  templateUrl: './notice-board.html',
  styleUrl: './notice-board.scss'
})
export class NoticeBoard {
  notices: Notice[] = [];
  page = 1;
  pageSize = 16;
  loading = false;
  hasMore = true;

  constructor( private dbService: DbHandlerService ) {
    this.loadNotices();
  }

  loadNotices() {
    this.loading = true;
    const offset = ( this.page - 1 ) * this.pageSize;
    this.dbService.getNotices( this.pageSize, offset ).subscribe( ( notices: Notice[] ) => {
      this.notices = notices;
      this.loading = false;
      this.hasMore = notices.length === this.pageSize;
    } );
  }

  nextPage() {
    if ( this.hasMore ) {
      this.page++;
      this.loadNotices();
    }
  }

  prevPage() {
    if ( this.page > 1 ) {
      this.page--;
      this.loadNotices();
    }
  }
}
