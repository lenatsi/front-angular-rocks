import { GroupService } from './../../services/groups/group.service'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  name = ''

  description = ''
  foundationdate = ''
  photo = ''
  gender = ''
  id = ''
  constructor(
    private activeRoute: ActivatedRoute,
    private groupService: GroupService,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((parm) => {
      console.log(parm.id)
      this.id = parm.id
    })
    this.getGroup()
  }
  getGroup() {
    const id = this.id
    this.groupService.getGroup(id).subscribe((data) => {
      console.log(data)
      this.name = data.name
      this.description = data.description
      this.foundationdate = data.foundationDate
      this.photo = data.photo
      this.gender = data.gender
    })
    this.groupService.getGroup(id).subscribe(
      (data) => {
        console.log(data.name)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }
}
