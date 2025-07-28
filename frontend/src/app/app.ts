import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Intro } from './intro/intro';
import { NoticeBoard } from './notice-board/notice-board';
import { Footer } from './footer/footer';
import { ToggleThemeButton } from './toggle-theme-button/toggle-theme-button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Intro,
    NoticeBoard,
    Footer,
    ToggleThemeButton
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}

