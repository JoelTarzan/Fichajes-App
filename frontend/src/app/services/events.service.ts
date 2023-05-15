import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(this.endpoint + '/events');
  }

  getEventsByUser(id: string): Observable<any> {
    return this.http.get(this.endpoint + '/events/all/' + id);
  }
}
