import {Component, OnInit} from '@angular/core';
import {PositionService} from "../shared/services/position.service";
import {Outlay, Position} from "../shared/interfaces";
import {BootstrapService} from "../shared/services/bootstrap.service";
import {OutlayService} from "../shared/services/outlay.service";

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

  constructor(private position: PositionService,
              private bootstrap: BootstrapService,
              private outlay: OutlayService) { }

  ngOnInit(): void {
    this.getAllPosition()
    this.getAllOutlay()
  }

  getAllPosition() {
    this.position.fetch().subscribe(
      (position) => {
        this.positionList = position
      }, error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

  getAllOutlay() {
    this.outlay.fetch().subscribe(
      (outlay) => {
        this.outlayList = outlay
      }, error => {
        this.message = error.error.message
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
