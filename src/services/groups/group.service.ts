import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from './../../app/models/group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

constructor(private httpClient: HttpClient) { }

getGroups(filter:string, startDate:string, endDate:string): Observable<any> {
  const params = { filter:filter, startDate:startDate, endDate:endDate}
  return this.httpClient
    .get(`${environment.apiUrl}/groups`, { params:params })
    .pipe(
      catchError((error) => {
        return error
      }),
    )
}
saveGroup(Group: Group): Observable<any> {
  return this.httpClient.post(`${environment.apiUrl}/group`, Group).pipe(
    catchError((error) => {
      return error
    }),
  )
}
getGroup(_id: string): Observable<any> {
  return this.httpClient.get(`${environment.apiUrl}/group/${_id}`).pipe(
    catchError((error) => {
      return error
    }),
  )
}
updateGroup(Group: Group): Observable<any> {
  return this.httpClient
    .put(`${environment.apiUrl}/group/${Group._id}`, Group)
    .pipe(
      catchError((error) => {
        return error
      }),
    )
}
deleteGroup(_id: string): Observable<any> {
  return this.httpClient.delete(`${environment.apiUrl}/group/${_id}`).pipe(
    catchError((error) => {
      return error
    }),
  )
}

getGroupSongs(_id: string): Observable<any> {
  return this.httpClient.get(`${environment.apiUrl}/group/${_id}/songs`).pipe(
    catchError((error) => {
      return error
    }),
  )
}

getSongs(filter: string): Observable<any> {
  const params = {filter:filter}
  return this.httpClient
    .get(`${environment.apiUrl}/songs`, { params:params })
    .pipe(
      catchError((error) => {
        return error
      }),
    )
}

}
