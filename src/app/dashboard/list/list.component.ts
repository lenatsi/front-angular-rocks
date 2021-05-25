import { NotifierService } from 'angular-notifier'
import { GroupService } from './../../../services/groups/group.service'
import { Component, OnInit } from '@angular/core'
import { Group } from 'src/app/models/group.model'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  start = ''
  end = ''
  filter = ''
  idDelete = ''
  modal = false
  groups: Array<Group> = []
  displayedColumns: string[] = ['photo', 'name', 'edit', 'delete']
  constructor(
    private groupService: GroupService,
    private notifierService: NotifierService,
  ) {}

  ngOnInit() {
    this.loadData()
  }
  //Variables "end" y "start" si se quisiera implementar un filtrado por fecha de creación del grupo

  loadData() {
    this.groupService.getGroups(this.filter, this.start, this.end).subscribe(
      (data: Group[]) => {
        this.groups = data
      },
      (error) => {
        this.notifierService.notify(
          'error',
          'Algo ha ido mal. Prueba hacerlo otra vez.',
        )
        return
      },
    )
  }

  deleteGroup(id: string) {
    console.log(id)
    this.modal = true
    this.idDelete = id
  }
  modalDelete() {
    this.groupService.deleteGroup(this.idDelete).subscribe(
      (data) => {
        this.modal = false
        this.notifierService.notify(
          'success',
          '¡El grupo se ha borrado correctamente!',
        )
        this.loadData()
      },
      (error) => {
        this.notifierService.notify(
          'error',
          'Algo ha ido mal. Prueba hacerlo otra vez.',
        )
        return
      },
    )
  }
}
