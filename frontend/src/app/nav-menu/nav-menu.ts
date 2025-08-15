import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Department } from '../TypeDefs';
import { DbHandlerService } from '../services/db-handler-service';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})
export class NavMenu {
  departmentsList: Department[] = []
  navCollapsed = true;

  constructor( private dbService: DbHandlerService ) {
    this.dbService.getDepartments().subscribe( ( departments: Department[] ) => {
      if ( departments && departments.length > 0 ) {
        this.departmentsList = departments;
        console.log(`Loaded ${departments.length} departments.`);
      } else {
        console.warn('No departments found.');
      }
    })
  }
}
