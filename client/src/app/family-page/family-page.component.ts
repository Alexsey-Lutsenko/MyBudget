import {Component, ElementRef, OnInit} from '@angular/core';
import {FamilyService} from "../shared/services/family.service";
import {Family, NewFamily} from "../shared/interfaces";
import {BootstrapService} from "../shared/services/bootstrap.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})
export class FamilyPageComponent implements OnInit {

  newFamily: NewFamily
  name: string
  message: string
  families: Family[]

  constructor(private family: FamilyService,
              private bootstrap: BootstrapService) {}

  ngOnInit(): void {
    this.getAllFamily()
  }

  getAllFamily() {
    this.family.fetch().subscribe(
      (families) => {
        this.families = families
      }
    )
  }

  createFamily(name: string) {
    if (name) {
      this.newFamily = {name:name}
        this.family.create(this.newFamily).subscribe(
        () => {
          this.message = 'Создана новая семья'
          this.bootstrap.toast()
          this.name = null
          this.getAllFamily()
        }, error => {
          this.message = error.error.message
            this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Введено некорректное имя'
      this.bootstrap.toast()
    }
  }

  openModal(e: ElementRef) {
    this.bootstrap.modalOpen(e)
  }

  addUserFamily() {

  }

  deleteUserFamily() {

  }

}
