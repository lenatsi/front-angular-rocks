import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  visible = false
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe( route => {
      if (route instanceof NavigationEnd){
        if(route.url == "/login" || route.url == "/register" || route.url.includes('dashboard')) {
          this.visible =true
        } else{
          this.visible = false
        }
      }
    })
  }


}
