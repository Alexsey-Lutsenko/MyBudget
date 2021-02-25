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
              private dragulaService: DragulaService) {
    dragulaService.destroy("POSITIONS")

    this.dragulaService.createGroup("POSITIONS", {
    });

    this.dragulaService.dropModel("POSITIONS").subscribe(args => {
      // console.log(args);
      // console.log(this.positionsList)

      let idxNew = args.sourceModel.findIndex(p => p.name == args.item.name).toString()
      let posNew = ((args.sourceModel[+idxNew - 1]?.order ? args.sourceModel[+idxNew - 1].order : 0)
        + (args.sourceModel[+idxNew + 1]?.order ? args.sourceModel[+idxNew + 1].order : args.sourceModel.length + 1))/2
      console.log('old = ' + idxNew, 'newPosition = (array[i-1] ' + (args.sourceModel[+idxNew - 1]?.order ? args.sourceModel[+idxNew - 1].order : 0) +
        '+ array[i+1]) ' + (args.sourceModel[+idxNew + 1]?.order ? args.sourceModel[+idxNew + 1].order : args.sourceModel.length + 1) + '/2 = ' + posNew)
      this.updateOrder(args.item._id, posNew)
      this.getAllPosition()
    })
  }


  ngOnInit(): void {
    this.getAllPosition()
  }

  getAllPosition() {
    this.position.fetch().subscribe((position) => {
      this.positionsList = position

      this.positionsList.sort((a,b) => {
        return a.order - b.order;
      })
    })
  }


  createPosition() {
    const name = this.name
    const order = this.positionsList.length + 1

    if (name) {
      this.position.create(name, this.family.localGet(), order).subscribe(
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

  updateOrder(id: string, newOrder: number) {
    this.position.updateOrder(id, newOrder).subscribe(
      () => {
        this.message = 'Порядок позиций изменен'
        this.bootstrap.toast()
      }, error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

}
