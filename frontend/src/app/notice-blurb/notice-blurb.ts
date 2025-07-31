import { Component, Input, SimpleChanges } from '@angular/core';
import { Notice } from '../TypeDefs';

@Component({
  selector: 'app-notice-blurb',
  imports: [],
  templateUrl: './notice-blurb.html',
  styleUrl: './notice-blurb.scss'
})
export class NoticeBlurb {
  @Input() noticeData: Notice = {
    id: 0,
    title: 'No data here.',
    content: 'Please check your connection.',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdAtFriendly: '',
    updatedAtFriendly: '',
    class: 'notice-blurb-default'
  };

  id = this.noticeData.id;
  title = this.noticeData.title;
  content = this.noticeData.content;
  createdAt = this.noticeData.createdAt;
  updatedAt = this.noticeData.updatedAt;
  createdAtFriendly = this.createdAt.toLocaleDateString() + ' ' + this.createdAt.toLocaleTimeString();
  updatedAtFriendly = this.updatedAt.toLocaleDateString() + ' ' + this.updatedAt.toLocaleTimeString();
  class = this.noticeData.class || 'notice-blurb-default';

  createdAtDay = this.noticeData.createdAt.getDate().toString();
  createdAtMonth = this.noticeData.createdAt.toLocaleString('en-US', { month: 'short' });
  createdAtYear = this.noticeData.createdAt.getFullYear().toString();

  createdAtRest = this.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes['noticeData'] && changes['noticeData'].currentValue ) {
      const data = changes['noticeData'].currentValue;

      this.id = data.id || 0;
      this.title = data.title || 'No title provided';
      this.content = data.content || 'No content provided';
      this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
      this.createdAtFriendly = this.createdAt.toLocaleDateString() + ' ' + this.createdAt.toLocaleTimeString();
      this.updatedAtFriendly = this.updatedAt.toLocaleDateString() + ' ' + this.updatedAt.toLocaleTimeString();
      this.class = data.class || 'notice-blurb-default';
    }
  }
}
