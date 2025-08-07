import { Component } from '@angular/core';
import { NoticeBoard } from '../notice-board/notice-board';

@Component({
  selector: 'app-intro',
  imports: [
    NoticeBoard
  ],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class Intro {

}
