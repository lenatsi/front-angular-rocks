import { UserService } from './../../../services/user/user.service';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from './../../models/group.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/groups/group.service';
import { abort } from 'process';

@Component({
  selector: 'app-editGroup',
  templateUrl: './editGroup.component.html',
  styleUrls: ['./editGroup.component.scss']
})
export class EditGroupComponent implements OnInit {

  name = ''
  gender = ''
  description = ''
  photo = ''
  foundationDate = ''
  id = ''
  editForm: FormGroup
  isSend = false
  group: Group = new Group()
  messageSaved = '¡Este grupo se ha guardado correctamente!'
  messageUpdated ='Se ha actualizado la información correctamente'

  constructor(
    private groupService: GroupService,
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private activeRoute: ActivatedRoute,
  ) {
    this.editForm = fb.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      description: ['', [Validators.required]],
      foundationDate: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.id = param.id
      if (this.id !== undefined){
        this.injectData('')
      }
    })
  }


  get f() {
    return this.editForm.controls
  }
  injectData(id:string){
    this.groupService.getGroup(this.id).subscribe(
      (data) => {
        this.group = data
        this.name = data.name
      }
    )
  }

  updateGroup() {
    this.isSend = true
    if (this.editForm.invalid) {
      this.notifierService.notify('error', 'El formulario no es válido')
      return
    }
    this.activeRoute.params.subscribe((route) => {
      if (route.id == null) {
        const group: Group = new Group()
        group.name = this.f.name.value
        group.gender = this.f.gender.value
        group.description = this.f.description.value
        group.photo = this.f.photo.value
        group.foundationDate = this.f.foundationDate.value
        this.groupService.saveGroup(group).subscribe(
          (data) => {
            this.notifierService.notify( 'success', this.messageSaved)
            this.router.navigate(['/dashboard'])
          },
          (error) => {
            this.notifierService.notify( 'error', 'Algo ha ido mal. Prueba hacerlo otra vez.')
            return
          },
        )
      } else {
        const group: Group = new Group()
        group._id= this.id
        group.name = this.f.name.value
        group.gender = this.f.gender.value
        group.description = this.f.description.value
        group.photo = this.f.photo.value
        group.foundationDate = this.f.foundationDate.value
        this.groupService.updateGroup(group).subscribe(
          (data) => {
            this.notifierService.notify( 'success', this.messageUpdated)
          },
          (error) => {
            this.notifierService.notify( 'error', 'Algo ha ido mal. Prueba hacerlo otra vez.')
            return
          },
        )
        this.router.navigate(['/dashboard'])
      }

    })
  }

}
