import { GroupService } from './../../../services/groups/group.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  start = ''
  end = ''
  filter = ''
  groups: Array<Group> = []
  displayedColumns: string[] = ['position', 'photo', 'name', 'edit', 'delete'];
  constructor(private activeRoute: ActivatedRoute,
    private groupService: GroupService,) { }

  ngOnInit() {

    this.loadData()
  }
  loadData() {
    this.groupService.getGroups(this.filter, this.start, this.end).subscribe(
      (data: Group[]) => {
        this.groups = data
        //console.log(data)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }

}
