import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Intro } from './intro/intro';
import { NoticeBoard } from './notice-board/notice-board';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, Intro, NoticeBoard, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}

