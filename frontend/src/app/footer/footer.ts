import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
