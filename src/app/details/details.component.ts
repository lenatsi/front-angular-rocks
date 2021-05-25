import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from './../../services/groups/group.service'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { Song } from '../models/song.model'

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

  songs: Array<Song> = []
  songName = ''
  songLink = ''
  constructor(
    public sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private groupService: GroupService,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((parm) => {
      this.id = parm.id
    })
    this.getGroup()
    this.getGroupSongs()
  }
  getGroup() {
    const id = this.id
    this.groupService.getGroup(id).subscribe((data) => {
      this.name = data.name
      this.description = data.description
      this.foundationdate = data.foundationDate
      this.photo = data.photo
      this.gender = data.gender
    })
  }

  getGroupSongs() {
    const id = this.id
    this.groupService.getGroupSongs(id).subscribe((data) => {
      this.songs = data
    })
  }

  formatDate(date?: string): string {
    return moment(date).format('YYYY')
  }
}
