import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-outlay-page',
  templateUrl: './outlay-page.component.html',
  styleUrls: ['./outlay-page.component.scss']
})
export class OutlayPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.localGet()) {
      return
    } else {
      this.auth.getUser().subscribe(
        (user) => {
          this.localStorageActiveUser(user.id.toString(), user.name.toString())
        }
      )
    }
  }

  localStorageActiveUser(id: string, name: string) {
    const user = JSON.stringify({name: name, id: id})
    this.auth.activeIn(user)
  }

}
