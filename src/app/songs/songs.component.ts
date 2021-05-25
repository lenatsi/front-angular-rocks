import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from './../../services/groups/group.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  filter: string = ''
  songs = []

  constructor(public sanitizer: DomSanitizer,private activeRoute: ActivatedRoute,
    private groupService: GroupService,) { }

  ngOnInit() {
    this.groupService.getSongs(this.filter).subscribe(
      (data) => {
        this.songs = data
        console.log(data)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }
  onSearchChange(searchValue: any) {
    this.filter = searchValue.target.value
    const params = this.filter
    console.log(params)
    this.groupService.getSongs(params).subscribe(
      (data) => {
        this.songs = data
        console.log(data)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }

}
