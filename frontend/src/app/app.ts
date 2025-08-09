import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ToggleThemeButton } from './toggle-theme-button/toggle-theme-button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    ToggleThemeButton
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
