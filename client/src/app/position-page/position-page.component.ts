import { Component, OnInit } from '@angular/core';
import {PositionService} from "../shared/services/position.service";
import {Position} from "../shared/interfaces";
import {FamilyService} from "../shared/services/family.service";
import {BootstrapService} from "../shared/services/bootstrap.service";


@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.scss']
})
export class PositionPageComponent implements OnInit {

  positionsList: Position[]
  name: string
  message: string

  constructor(private position: PositionService,
              private family: FamilyService,
              private bootstrap: BootstrapService) { }

  ngOnInit(): void {
    this.getAllPosition()
  }

  getAllPosition() {
    this.position.fetch(this.family.localGet).subscribe((position) => {
      this.positionsList = position
      console.log(position)
    })
  }

  created() {
    window.addEventListener('storage', () => {
      console.log('yes')
    })
  }

  createPosition(name: string) {
    console.log(name, this.family.localGet)

    if (name) {
      this.position.create(name, this.family.localGet).subscribe(
        () => {
          this.getAllPosition()
          this.message = `Поле ${name} успешно добавлено`
          this.bootstrap.toast()
        },
        error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    }
  }

}
