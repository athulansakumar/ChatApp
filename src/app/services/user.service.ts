import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addNewUser(user:User): Observable<any>{
      return this.http.post('/user',user);
  }

  signIn(user:User): Observable<any>{
      return this.http.post('/signin',user);
  }
}
