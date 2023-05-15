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

  getEventById(id: number) {
    return this.http.get(this.endpoint + '/events/' + id);
  }

  getEventsByUser(id: string): Observable<any> {
    return this.http.get(this.endpoint + '/events/all/' + id);
  }

  createEvent(event: {user: string, schedule: number, scheduleId: string, date: string, holiday: boolean, sickLeave: boolean, vacation: boolean}): Observable<any> {
    return this.http.post(this.endpoint + '/events', event);
  }

  updateEvent(id: number, event: {holiday: string, sickLeave: string, vacation: string}): Observable<any> {
    return this.http.patch(this.endpoint + '/events/' + id, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(this.endpoint + '/events/' + id);
  }
}
