import { Routes } from '@angular/router';
import { NoticeArticle } from './notice-article/notice-article';

export const routes: Routes = [
  { path: 'notice/:id', component: NoticeArticle },
];
