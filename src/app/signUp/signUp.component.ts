import { Router } from '@angular/router'
import { NotifierService } from 'angular-notifier'
import { UserService } from './../../services/user/user.service'
import { User } from './../models/user.model'
import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms'

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent implements OnInit {
  mForm: FormGroup
  isSend = false
  email = ''
  Newpassword = ''
  name = ''

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private userService: UserService,
  ) {
    this.mForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
        (control) => this.validatePasswords(control, 'password'),
      ],
      passwordRepeat: [
        '',
        [
          Validators.required,
          (control) => this.validatePasswords(control, 'passwordRepeat'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$'),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
    })
  }
  ngOnInit() {}
  get password(): AbstractControl {
    return this.mForm.get('password')
  }

  get passwordRepeat(): AbstractControl {
    return this.mForm.get('passwordRepeat')
  }
  validatePasswords(control: AbstractControl, name: string) {
    if (
      this.mForm === undefined ||
      this.password.value === '' ||
      this.passwordRepeat.value === ''
    ) {
      return null
    } else if (this.password.value === this.passwordRepeat.value) {
      if (
        name === 'password' &&
        this.passwordRepeat.hasError('passwordMismatch')
      ) {
        this.password.setErrors(null)
        this.passwordRepeat.updateValueAndValidity()
      } else if (
        name === 'passwordRepeat' &&
        this.password.hasError('passwordMismatch')
      ) {
        this.passwordRepeat.setErrors(null)
        this.password.updateValueAndValidity()
      }
      return null
    } else {
      return {
        passwordMismatch: { value: 'Las contraseñas no coinciden' },
      }
    }
  }
  get f() {
    return this.mForm.controls
  }

  onSave() {
    this.isSend = true
    if (this.mForm.invalid) {
      this.notifierService.notify('error', 'El formulario no es válido')
      return
    }

    const user: User = new User()
    user.email = this.f.email.value
    user.password = this.f.password.value
    user.name = this.f.name.value
    this.userService.signup(user).subscribe(
      (data) => {
        this.router.navigate(['/login'])
      },
      (error) => {
        this.notifierService.notify(
          'error',
          'Algo ha ido mal. Prueba hacerlo otra vez.',
        )
        return
      },
    )
    this.notifierService.notify('success', '¡Te has registrado correctamente!')
  }

  login() {
    this.router.navigate(['/login'])
  }
}
