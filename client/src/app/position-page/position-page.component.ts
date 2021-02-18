import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PositionService} from "../shared/services/position.service";
import {Position} from "../shared/interfaces";
import {FamilyService} from "../shared/services/family.service";
import {BootstrapService} from "../shared/services/bootstrap.service";
import {DragulaService} from "ng2-dragula";
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.scss']
})

export class PositionPageComponent implements OnInit {

  faArrowsAlt = faArrowsAlt

  positionsList: Position[]
  name: string
  message: string

  @ViewChild('input') inputRename: ElementRef

  constructor(private position: PositionService,
              private family: FamilyService,
              private bootstrap: BootstrapService,
              private dragula: DragulaService) {
    dragula.createGroup('TASKS', {
      moves: (el, container, handle) => {
        return handle.classList.contains('handle')
      }
    })
  }

  ngOnInit(): void {
    this.getAllPosition()
  }

  getAllPosition() {
    this.position.fetch().subscribe((position) => {
      this.positionsList = position
    })
  }


  createPosition() {
    const name = this.name
    if (name) {
      this.position.create(name, this.family.localGet(), 1).subscribe(
        () => {
          this.name = null
          this.getAllPosition()
          this.message = `Позиция "${name}" успешно добавлена`
          this.bootstrap.toast()
        },
        error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Введите название позиции'
      this.bootstrap.toast()
    }
  }

  removePosition(id: string) {
    this.position.delete(id).subscribe(
      () => {
        this.getAllPosition()
        this.message = 'Позиция была удалена'
        this.bootstrap.toast()
      },
      error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

  renamePosition(id: string) {
    const name = this.inputRename.nativeElement.value
    if (name !== '') {
      this.position.update(id, name).subscribe(
        () => {
          this.getAllPosition()
          this.message = 'Позиция успешно переименована'
          this.bootstrap.toast()
        }, error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Введите название позиции'
      this.bootstrap.toast()
    }
  }

}
