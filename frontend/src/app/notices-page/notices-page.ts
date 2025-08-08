import { Component } from '@angular/core';
import { NoticeBoard } from '../notice-board/notice-board';

@Component({
  selector: 'app-notices-page',
  imports: [
    NoticeBoard
  ],
  templateUrl: './notices-page.html',
  styleUrl: './notices-page.scss'
})
export class NoticesPage {

}
