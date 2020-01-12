import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'http://127.0.0.1:5001/api'

  constructor(private http: HttpClient) { }

  public postSpecific(task){
    return this.http.post(`${this.url}/task`, task)
  } 

  public getAll(){
    return this.http.get<any[]>(`${this.url}/task`)
  }
}
