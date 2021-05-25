import { NotifierService } from 'angular-notifier'
import { GroupService } from './../../services/groups/group.service'
import { Group } from './../models/group.model'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  name: string = ''
  nameSearch: string = ''
  dateStartSearch: string = ''
  dateEndSearch: string = ''
  filtro = ''
  groups: Array<Group> = []
  filter: string = ''
  startInput = ''
  endInput = ''

  constructor(
    private activeRoute: ActivatedRoute,
    private groupService: GroupService,
    private notifierService: NotifierService,
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((value) => {
      if (value.name != undefined) {
        this.filter = value.name
      }
    })
    this.loadData()
  }

  clearDate(event) {
    event.stopPropagation()
    this.dateStartSearch = null
    this.dateEndSearch = null
    this.startInput = undefined
    this.endInput = undefined
    this.loadData()
  }

  onSearchChange(searchValue: any) {
    this.filtro = searchValue.target.value
    const params = this.filtro
    this.groupService.getGroups(params, '', '').subscribe(
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

  startChange(data: any) {
    let mDate = moment(data.value).format('DD/MM/YYYY')
    this.dateStartSearch = mDate
  }

  endChange(data: any) {
    if (data.value != null) {
      let mDate = moment(data.value).format('DD/MM/YYYY')
      this.dateEndSearch = mDate
      this.loadData()
    }
  }

  loadData() {
    let start = moment(this.dateStartSearch, 'DD/MM/YYYY').format('YYYY/MM/DD')
    let end = moment(this.dateEndSearch, 'DD/MM/YYYY').format('YYYY/MM/DD')
    if (!this.dateStartSearch || !this.dateEndSearch) {
      start = ''
      end = ''
    }
    this.groupService.getGroups(this.filter, start, end).subscribe(
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

  formatDate(date?: string): string {
    return moment(date).format('DD [de] MMMM [de] YYYY')
  }
}
