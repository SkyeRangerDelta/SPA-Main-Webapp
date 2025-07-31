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

  constructor( private dbService: DbHandlerService ) {
    this.loadNotices();
  }

  loadNotices() {
    this.dbService.getNotices().subscribe( ( noticesRes: any ) => {
      if ( noticesRes && noticesRes.length > 0 ) {
        console.log( `Found ${ noticesRes.length } notices.` );
      }
      else {
        console.log( 'No notices found.' );
      }
    } );
  }
}
