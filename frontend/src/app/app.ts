import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './header/header';
import { Intro } from './intro/intro';
import { NoticeBoard } from './notice-board/notice-board';
import { Footer } from './footer/footer';
import { ToggleThemeButton } from './toggle-theme-button/toggle-theme-button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Intro,
    NoticeBoard,
    Footer,
    ToggleThemeButton,
    NgTemplateOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showMainContent = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateContentVisibility();
    });
    this.updateContentVisibility();
  }

  private updateContentVisibility() {
    const url = this.router.url;
    // Hide main content if on /notice/:id
    this.showMainContent = !/^\/notice\/[0-9]+$/.test(url);
  }
}
