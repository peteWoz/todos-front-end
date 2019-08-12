import { Injectable } from '@angular/core';
import {Note} from '../model/note.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  fetchData(name: string) {
    return this.http.get<Note[]>('http://localhost:8080/users/' + name + '/todos');
  }

  deleteData(index: bigint) {
    return this.http.delete('http://localhost:8080/users/pete/todos/' + index);
  }

  updateData(note: Note) {
    console.log('Updating on the server: ', note);
    return this.http.put<Note>('http://localhost:8080/users/pete', note, this.httpOptions);
  }

  addData(note: Note) {
    return this.http.post<Note>('http://localhost:8080/users/pete/add', note, this.httpOptions);
  }
}
