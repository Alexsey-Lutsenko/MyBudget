import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-layout',
  templateUrl: './setting-layout.component.html',
  styleUrls: ['./setting-layout.component.scss']
})
export class SettingLayoutComponent implements OnInit {

  links = [
    {url: '/setting/position', name: 'Позиции'},
    {url: '/setting/family', name: 'Семья'}
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
