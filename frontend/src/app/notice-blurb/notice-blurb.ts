import { Component, Input, SimpleChanges } from '@angular/core';
import { Notice } from '../TypeDefs';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-notice-blurb',
  imports: [
    RouterLink,
    SlicePipe
  ],
  templateUrl: './notice-blurb.html',
  styleUrl: './notice-blurb.scss'
})
export class NoticeBlurb {
  currentDate = new Date();

  @Input() noticeData: Notice = {
    id: 0,
    title: 'No data here.',
    content: 'Please check your connection.',
    createdAt: this.currentDate,
    updatedAt: this.currentDate,
    createdAtFriendly: '',
    updatedAtFriendly: '',
    class: 'notice-blurb-default',
    author: ''
  };

  id = this.noticeData.id;
  title = this.noticeData.title;
  content = this.noticeData.content;
  createdAt = this.noticeData.createdAt;
  updatedAt = this.noticeData.updatedAt;
  createdAtFriendly = this.noticeData.createdAtFriendly;
  updatedAtFriendly = this.noticeData.updatedAtFriendly;
  class = this.noticeData.class || 'notice-blurb-default';
  author = this.noticeData.author || '';

  createdAtDay = this.noticeData.createdAt.getDate().toString();
  createdAtMonth = this.noticeData.createdAt.toLocaleString('en-US', { month: 'short' });
  createdAtYear = this.noticeData.createdAt.getFullYear().toString();

  createdAtRest = this.noticeData.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes['noticeData'] && changes['noticeData'].currentValue ) {
      const data = changes['noticeData'].currentValue as Notice;

      data.createdAt = new Date( data.createdAt );
      data.updatedAt = new Date( data.updatedAt );

      this.id = data.id || 0;
      this.title = data.title || 'No title provided';
      this.content = data.content || 'No content provided';
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.createdAtFriendly = data.createdAtFriendly;
      this.updatedAtFriendly = data.updatedAtFriendly;
      this.class = data.class || 'notice-blurb-default';
      this.author = data.author || '';

      this.createdAtDay = data.createdAt.getDate().toString();
      this.createdAtMonth = data.createdAt.toLocaleString('en-US', { month: 'short' });
      this.createdAtYear = data.createdAt.getFullYear().toString();
      this.createdAtRest = data.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
}
