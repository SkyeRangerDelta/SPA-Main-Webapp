import { Routes } from '@angular/router';
import { NoticeArticle } from './notice-article/notice-article';
import { AboutPage } from './about-page/about-page';
import { Intro } from './intro/intro';
import { NoticesPage } from './notices-page/notices-page';
import { Contact } from './contact/contact';
import { Eprocs } from './eprocs/eprocs';
import { Services } from './services/services';
import { Regulations } from './regulations/regulations';
import { Departments } from './departments/departments';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'notice/:id', component: NoticeArticle },
  { path: 'about', component: AboutPage },
  { path: 'notices', component: NoticesPage },
  { path: 'contact', component: Contact },
  { path: 'eprocs', component: Eprocs },
  { path: 'services', component: Services },
  { path: 'regulations', component: Regulations },
  { path: 'departments', component: Departments }
];
