import { Routes } from '@angular/router';
import { NoticeArticle } from './notice-article/notice-article';
import { AboutPage } from './about-page/about-page';
import { Intro } from './intro/intro';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'notice/:id', component: NoticeArticle },
  { path: 'about', component: AboutPage }
];
