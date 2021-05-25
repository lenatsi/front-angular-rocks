import { NotifierService } from 'angular-notifier'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private notifierService: NotifierService,
  ) {}

  ngOnInit() {}
  addNew() {
    this.router.navigate(['/dashboard/edit'])
  }
  logOut() {
    try {
      this.notifierService.notify(
        'default',
        'Has cerrado la sesión. ¡Vuelve pronto!',
      )
      localStorage.removeItem('token')
    } catch (error) {
      this.notifierService.notify(
        'error',
        'Algo ha ido mal. Prueba hacerlo otra vez.',
      )
      return
    }
  }


}
