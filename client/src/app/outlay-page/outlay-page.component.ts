import {Component, Input, OnInit} from '@angular/core';
import {PositionService} from "../shared/services/position.service";
import {Family, Outlay, Position} from "../shared/interfaces";
import {BootstrapService} from "../shared/services/bootstrap.service";
import {OutlayService} from "../shared/services/outlay.service";
import {FamilyService} from "../shared/services/family.service";

@Component({
  selector: 'app-outlay-page',
  templateUrl: './outlay-page.component.html',
  styleUrls: ['./outlay-page.component.scss']
})
export class OutlayPageComponent implements OnInit {

  sum: number
  message: string
  positionList: Position[]
  outlayList: Outlay[]
  families: Family[]
  activeFamily: string
  positionQty: number

  constructor(private position: PositionService,
              private family: FamilyService,
              private bootstrap: BootstrapService,
              private outlay: OutlayService) { }

  ngOnInit(): void {
    this.family.fetch().subscribe((families) => {
      this.getAllPosition()
      this.getAllOutlay()
      this.activeFamily = this.family.localGet()
    })
  }

  getAllPosition() {
    this.position.fetch(this.family.localGet()).subscribe(
      (position) => {
        this.positionList = position
        this.positionList.sort((a,b) => {
          return a.order - b.order;
        })
        this.positionQty = this.positionList.length
      }, error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

  getAllOutlay() {
    this.outlay.fetch(this.family.localGet()).subscribe(
      (outlay) => {
        this.outlayList = outlay
        this.outlayList.sort((a,b) => {
          let dateA = a.date
          let dateB = b.date

          if (dateA > dateB) {
            return -1
          }
          if (dateA < dateB) {
            return 1
          }
          return 0
        })
      }, error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }


  createOutlay(name: string) {
    if (this.sum) {
      this.outlay.create(name, this.sum).subscribe(
        () => {
          this.sum = null
          this.getAllOutlay()
          this.message = 'Позиция успешно добавлена'
          this.bootstrap.toast()
        },error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Введите сумму расходов'
      this.bootstrap.toast()
    }
  }

  deleteOutlay(id: string) {
    this.outlay.delete(id).subscribe(
      (outlay) => {
        this.getAllOutlay()
        this.message = outlay.message
        this.bootstrap.toast()
      }, error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

}
