import { Component, OnInit } from '@angular/core';
import {Router, RouterLinkActive, RouterModule} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  currentURL:string
  login: boolean
  register: boolean

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.currentURL = this.router.url

    console.log(this.currentURL)
  }

}
