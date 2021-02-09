import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/outlay', name: 'Расходы'},
    {url: '/income', name: 'Доходы'},
    {url: '/setting', name: 'Настройки'}
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
