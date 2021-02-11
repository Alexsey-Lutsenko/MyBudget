import {Component, ElementRef, OnInit} from '@angular/core';
import {FamilyService} from "../shared/services/family.service";
import {Family} from "../shared/interfaces";
import {BootstrapService} from "../shared/services/bootstrap.service";

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})
export class FamilyPageComponent implements OnInit {

  name: string
  findString:string
  message: string
  errorMessage: string
  families: Family[]
  currentId: string
  typeModal: number

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
        this.family.create(name).subscribe(
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

  renameFamily(findString: string, modal: ElementRef) {
    console.log(findString)
    if (findString && this.currentId) {
      this.family.rename(this.currentId, findString).subscribe(
        () => {
          this.getAllFamily()
          this.bootstrap.modalExit(modal)
          this.message = 'Успешно переименовано'
          this.bootstrap.toast()
        },
        error => {
          this.errorMessage = error.error.message
        }
      )
    } else {
      this.message = 'Что-то пошло не так'
      this.bootstrap.toast()
    }
  }

  openModal(e: ElementRef, id: string, type: number) {
    this.errorMessage = null
    this.findString = null
    this.bootstrap.modalOpen(e)
    this.currentId = id
    this.typeModal = type
  }

  addUserFamily(findString: string, modal: ElementRef) {
    if (findString && this.currentId) {
      this.family.addUser(this.currentId, findString).subscribe(
        () => {
          this.getAllFamily()
          this.bootstrap.modalExit(modal)
          this.message = 'Добавлен новый участник'
          this.bootstrap.toast()
        },
        error => {
          this.errorMessage = error.error.message
        }
      )
    } else {
      this.message = 'Что-то пошло не так'
      this.bootstrap.toast()
    }
  }

  deleteAllFamily(id: string) {
    if (id) {
      this.family.delete(id).subscribe(
        (message) => {
          this.getAllFamily()
          this.message = message.message
          this.bootstrap.toast()
        },
        error => {
          this.message = 'Что-то пошло не так'
          this.bootstrap.toast()
        }
      )
    }
  }

  deleteUserFamily(id: string, userId: string, admin: boolean) {
    if (!admin) {
      this.family.deleteUser(id, userId).subscribe(
        (message) => {
          this.getAllFamily()
          this.message = message.message
          this.bootstrap.toast()
        },
        error => {
          this.message = 'Что-то пошло не так'
          this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Нельзя удалить администратора'
      this.bootstrap.toast()
    }
  }

}
