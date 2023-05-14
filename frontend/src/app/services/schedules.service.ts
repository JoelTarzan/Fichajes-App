import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getSchedules(): Observable<any> {
    return this.http.get(this.endpoint + '/schedules');
  }

  getScheduleById(id: number): Observable<any> {
    return this.http.get(this.endpoint + '/schedules/' + id);
  }

  createSchedule(schedule: {name?: string, mondayEntry?: string, mondayExit?: string, mondayBreakTimeMinutes?: number, workOnMonday?: boolean, tuesdayEntry?: string; tuesdayExit?: string; tuesdayBreakTimeMinutes?: number; workOnTuesday?: boolean; wednesdayEntry?: string; wednesdayExit?: string; wednesdayBreakTimeMinutes?: number; workOnWednesday?: boolean; thursdayEntry?: string; thursdayExit?: string; thursdayBreakTimeMinutes?: number; workOnThursday?: boolean; fridayEntry?: string; fridayExit?: string; fridayBreakTimeMinutes?: number; workOnFriday?: boolean; saturdayEntry?: string; saturdayExit?: string; saturdayBreakTimeMinutes?: number; workOnSaturday?: boolean; sundayEntry?: string; sundayExit?: string; sundayBreakTimeMinutes?: number; workOnSunday?: boolean;}): Observable<any> {
    return this.http.post(this.endpoint + '/schedules', schedule);
  }

  updateSchedule(id: number, schedule: {name?: string, mondayEntry?: string, mondayExit?: string, mondayBreakTimeMinutes?: number, workOnMonday?: boolean, tuesdayEntry?: string; tuesdayExit?: string; tuesdayBreakTimeMinutes?: number; workOnTuesday?: boolean; wednesdayEntry?: string; wednesdayExit?: string; wednesdayBreakTimeMinutes?: number; workOnWednesday?: boolean; thursdayEntry?: string; thursdayExit?: string; thursdayBreakTimeMinutes?: number; workOnThursday?: boolean; fridayEntry?: string; fridayExit?: string; fridayBreakTimeMinutes?: number; workOnFriday?: boolean; saturdayEntry?: string; saturdayExit?: string; saturdayBreakTimeMinutes?: number; workOnSaturday?: boolean; sundayEntry?: string; sundayExit?: string; sundayBreakTimeMinutes?: number; workOnSunday?: boolean;}): Observable<any> {
    return this.http.patch(this.endpoint + '/schedules/' + id, schedule);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete(this.endpoint + '/schedules/' + id);
  }

}
