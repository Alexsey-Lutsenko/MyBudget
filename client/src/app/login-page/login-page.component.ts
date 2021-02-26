import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BootstrapService} from "../shared/services/bootstrap.service";
declare var $: any

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', './../shared/layouts/auth-layout/auth-layout.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  message: string

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private bootstrap: BootstrapService) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Можно зайти в систему
      } else if (params['accessDenied']) {
        // Авторизуйтесь в системе
      }
    })

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/outlay'])
        // this.auth.getUser().subscribe(
        //   (user) => {
        //     console.log(user)
        //   }
        // )
      },
      error => {
        this.message = error.error.message
        this.bootstrap.toast()
        this.form.enable()
      }
    )
  }

}
