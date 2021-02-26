import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IncomeService} from "../shared/services/income.service";
import {BootstrapService} from "../shared/services/bootstrap.service";
import {Income} from "../shared/interfaces";
import {FamilyService} from "../shared/services/family.service";

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.scss']
})
export class IncomePageComponent implements OnInit {

  message: string
  sum: number
  incomes: Income[]
  activeFamily: string

  @ViewChild('input') inputRename: ElementRef

  constructor(private income: IncomeService,
              private family: FamilyService,
              private bootstrap: BootstrapService) { }

  ngOnInit(): void {
    this.getAllIncomes()
    this.activeFamily = this.family.localGet()
  }

  getAllIncomes() {
    this.income.fetch().subscribe(
      (income) => {
        this.incomes = income
      }
    )
  }

  createIncome() {
    if (this.sum) {
      this.income.create(this.sum).subscribe(
        () => {
          this.getAllIncomes()
          this.sum = null
          this.message = 'Создан новый доход'
          this.bootstrap.toast()
        } , error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    }
  }

  removeIncome(id: string) {
    this.income.delete(id).subscribe(
      () => {
        this.getAllIncomes()
        this.message = 'Доход был удален'
        this.bootstrap.toast()
      },
      error => {
        this.message = error.error.message
        this.bootstrap.toast()
      }
    )
  }

  chargeIncome(id: string, currentSum: number) {
    const sum =+ this.inputRename.nativeElement.value
    console.log(sum, this.inputRename.nativeElement.value)
    if (sum === currentSum) {
      this.message = 'Введите отличное от текущего значение'
      this.bootstrap.toast()
      return
    }
    if (sum) {
      this.income.update(id, sum).subscribe(
        () => {
          this.getAllIncomes()
          this.message = 'Доход успешно исправлен'
          this.bootstrap.toast()
        }, error => {
          this.message = error.error.message
          this.bootstrap.toast()
        }
      )
    } else {
      this.message = 'Введите новую сумму'
      this.bootstrap.toast()
    }
  }

}
