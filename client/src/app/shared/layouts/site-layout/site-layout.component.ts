import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FamilyService} from "../../services/family.service";
import {Family, Position} from "../../interfaces";
import {PositionService} from "../../services/position.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  links = [
    {url: '/outlay', name: 'Расходы'},
    {url: '/income', name: 'Доходы'},
    {url: '/analytical', name: 'Аналитика'},
    {url: '/setting', name: 'Настройки'}
  ]

  activeFamilies: Family
  activeFamilyName: string
  families: Family[]
  e: boolean
  positions: Position[]

  constructor(private auth: AuthService,
              private router: Router,
              private family: FamilyService,
              private position: PositionService,
              @Inject(DOCUMENT) private _document: Document) {
  }


  ngOnInit(): void {
    try {
      this.auth.localGet()
    } catch {
      this.getUser()
    }

    try {
      this.family.localGet()
      this.activeFamilyName = this.family.localGetName()
    } catch {
      this.family.fetch().subscribe((families) => {
        const defMax = families.sort((a,b) => {
          return b.def - a.def
        })[0].def

        this.activeFamilies = families.find(f => f.def == defMax)
        this.families = families
        this.family.activeIn(JSON.stringify({name: this.activeFamilies.name, id: this.activeFamilies._id}))
        this.activeFamilyName = this.family.localGetName()
      })
    }
  }

  getUser() {
    this.auth.getUser().subscribe(
      (user) => {
        this.localStorageActiveUser(user.id.toString(), user.name.toString())
      }
    )
  }

  localStorageActiveUser(id: string, name: string) {
    const user = JSON.stringify({name: name, id: id})
    this.auth.activeIn(user)
  }

  getAllFamily() {
    this.family.fetch().subscribe((families) => {
      this.families = families
    })
  }


  saveFamily(id: string, name: string) {
    const family = JSON.stringify({name: name, id: id})
    this.family.activeIn(family)
    this.pageReload()
  }

  removeActiveFamily() {
    this.family.activeOut()
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
