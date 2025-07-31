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
        this.notices = [
          {
            id: 1,
            title: 'Welcome to the Notice Board',
            content: 'This is a sample critical notice to demonstrate the notice board functionality.',
            createdAtFriendly: new Date().toDateString(),
            updatedAtFriendly: new Date().toDateString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            class: 'critical'
          } as Notice,
          {
            id: 2,
            title: 'Welcome to the Notice Board',
            content: 'This is a sample neutral notice to demonstrate the notice board functionality.',
            createdAtFriendly: new Date().toDateString(),
            updatedAtFriendly: new Date().toDateString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            class: ''
          } as Notice,
          {
            id: 3,
            title: 'Welcome to the Notice Board',
            content: 'This is a sample info notice to demonstrate the notice board functionality.',
            createdAtFriendly: new Date().toDateString(),
            updatedAtFriendly: new Date().toDateString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            class: 'info'
          } as Notice,
          {
            id: 4,
            title: 'Welcome to the Notice Board',
            content: 'This is a sample warning notice to demonstrate the notice board functionality.',
            createdAtFriendly: new Date().toDateString(),
            updatedAtFriendly: new Date().toDateString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            class: 'warning'
          } as Notice
        ]
      }
    } );
  }
}
