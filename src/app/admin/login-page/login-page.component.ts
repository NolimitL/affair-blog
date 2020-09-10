import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/Custom.validators';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  loginMessage:string

  constructor(
    public auth: AuthService,
    private router: Router,
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
        CustomValidators.notCorrectEmail
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(9),
        CustomValidators.absenceSymbol
      ])
    })
    this.activedRouter.queryParams.subscribe((params:Params) => {
      if (params['loginAgain']) {
        this.loginMessage = 'Please login first'
      }
      if (params['authError']){
        this.loginMessage = 'Incorrect authorization'
      }
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    const user:User = {
      email:this.form.value.email,
      password:this.form.value.password,
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
      this.submitted = false
      this.loginMessage = null
    }, () => {
      this.submitted = false
      this.loginMessage = null
    })
  }
}
