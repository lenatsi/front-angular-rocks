import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  isSend = false


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private userService: UserService,
  ) {
    this.loginForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$'),
        ],
      ],
    })
  }
  ngOnInit() {}
  get f() {
    return this.loginForm.controls
  }

  onSave() {
    this.isSend = true
    //console.log('Guardar!!', this.mForm)

    if (this.loginForm.invalid) {
      //console.error('El formulario NO es válido')
      return
    }
    //console.log('El formulario es válido')
    const login: Login = new Login()
    login.email = this.f.email.value
    login.password = this.f.password.value
    this.userService.login(login).subscribe(
      (data) => {
        this.notifierService.notify('success', 'Datos actualizados')
        localStorage.setItem('token', data.access_token)
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        console.log('Error:', error)
      },
    )

  }
  signup() {
    this.router.navigate(['/signup'])
  }
}

