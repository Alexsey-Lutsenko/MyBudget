import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FamilyService} from "../../services/family.service";
import {Family, Position} from "../../interfaces";
import {PositionService} from "../../services/position.service";
import {DOCUMENT} from "@angular/common";
import {ObjectID} from 'mongodb'

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  links = [
    {url: '/outlay', name: 'Расходы'},
    {url: '/income', name: 'Доходы'},
    {url: '/setting', name: 'Настройки'}
  ]

  familiesList: Family[]
  activeFamily: string
  loading: boolean
  e: boolean
  positions: Position[]

  constructor(private auth: AuthService,
              private router: Router,
              private family: FamilyService,
              private position: PositionService,
              @Inject(DOCUMENT) private _document: Document) {
  }


  ngOnInit(): void {
    this.getAllFamily()
    console.log(this.familiesList)
    this.activeFamily = this.family.localGet()
    // console.log(this.familiesList)
    // this.activeFamily = this.familiesList.find((f) => f._id === this.family.localGet).name
  }

  getAllFamily() {
    this.family.fetch().subscribe((families) => {
      this.familiesList = families
      console.log(this.familiesList)
      const id = new ObjectID
      let a = this.familiesList.find(f => f._id === 'Луценко')
      console.log(a)
    })
  }

  saveFamily(id: string, name: string) {
    this.e = true
    this.family.activeIn(id)
    this.activeFamily = name
    this.pageReload()
  }

  removeActiveFamily() {
    this.family.activeOut()
    this.activeFamily = ''
    this.pageReload()
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  pageReload() {
    this._document.defaultView.location.reload();
  }

}
