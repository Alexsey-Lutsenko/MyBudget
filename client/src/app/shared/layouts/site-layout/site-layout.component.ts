import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FamilyService} from "../../services/family.service";
import {Family} from "../../interfaces";

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

  familiesList: Family[]
  activeFamily: string
  loading: boolean

  constructor(private auth: AuthService,
              private router: Router,
              private family: FamilyService) {
  }

  ngOnInit(): void {
    this.getAllFamily()
    // console.log(this.familiesList)
    // this.activeFamily = this.familiesList.find((f) => f._id === this.family.localGet).name
  }

  getAllFamily() {
    this.loading = true
    this.family.fetch().subscribe((families) => {
      this.familiesList = families
    })
    this.loading = false
  }

  saveFamily(id: string, name: string) {
    this.family.activeIn(id)
    this.activeFamily = name
  }

  removeActiveFamily() {
    this.family.activeOut()
    this.activeFamily = null
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
