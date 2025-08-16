import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  isNotice = false;

  constructor( private router: Router ) {}

  ngOnInit() {
    this.router.events.subscribe( event => {
      if ( event instanceof NavigationEnd ) {
        // Check if the current route is 'notices' or 'notices/:id'
        this.isNotice = /^\/notice\/[^\/]+$/.test( event.urlAfterRedirects );
      }
    } )
  }

  footerALinks = [
    { label: 'About the Authority', url: '/about' },
    { label: 'Regulations', url: '/regulations' },
    { label: 'Public Notices', url: '/notices' }
  ];

  footerBLinks = [
    { label: 'Contact Us', url: '/contact' },
    { label: 'Emergency Procedures', url: '/eprocs' },
    { label: 'Harbour Services', url: '/harbourservices' }
  ];
}
