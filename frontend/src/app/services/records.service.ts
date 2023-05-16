import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RecordRow } from "../components/records/recordRow";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  endpoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRecordsRow(id: string): Observable<RecordRow[]> {
    const events$ = this.http.get<any[]>(this.endpoint + '/events/workdays/' + id);
    const records$ = this.http.get<any[]>(this.endpoint + '/records/all/' + id);

    return forkJoin([events$, records$]).pipe(
      map(([eventsResult, recordsResult]) => {
        const formattedEvents: RecordRow[] = this.formatEvents(eventsResult);
        const formattedRecords: RecordRow[] = this.formatRecords(recordsResult);

        const recordsWithId = formattedEvents.map(event => ({
          ...event,
          id: this.searchId(formattedRecords, event.date),
          entry: this.searchEntry(formattedRecords, event.date),
          exit: this.searchExit(formattedRecords, event.date),
          breakTimeMinutes: this.searchBreakTimeMinutes(formattedRecords, event.date)
        }));

        return recordsWithId.sort((a, b) => {
          const dateA = new Date(a.date!);
          const dateB = new Date(b.date!);
          return dateA.getTime() - dateB.getTime();
        });
      })
    );
  }

  getRecordByUserToday(id: string) {
    return this.http.get(this.endpoint + '/records/today/' + id);
  }

  getRecordsById(id: string): Observable<any> {
    return this.http.get(this.endpoint + '/records/' + id);
  }

  createRecord(record: any): Observable<any> {
    return this.http.post(this.endpoint + '/records', record);
  }

  updateRecord(id: number, record: any): Observable<any> {
    return this.http.patch(this.endpoint + '/records/' + id, record);
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete(this.endpoint + '/records/' + id);
  }

  private formatEvents(events: any[]): RecordRow[] {
    return events.map(event => ({
      eventId: event.id,
      date: event.date,
      entryExpected: event.entryHour,
      exitExpected: event.exitHour,
      breakTimeMinutesExpected: event.breakTimeMinutesExpected
    }));
  }

  private formatRecords(records: any[]): RecordRow[] {
    return records.map(record => ({
      id: record.id,
      date: record.date,
      entry: record.entry,
      exit: record.exit,
      breakTimeMinutes: record.breakTimeMinutes
    }));
  }

  private searchId(records: RecordRow[], date: string | undefined): number | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.id : undefined;
  }

  private searchEntry(records: RecordRow[], date: string | undefined): string | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.entry : undefined;
  }

  private searchExit(records: RecordRow[], date: string | undefined): string | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.exit : undefined;
  }

  private searchBreakTimeMinutes(records: RecordRow[], date: string | undefined): number | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.breakTimeMinutes : undefined;
  }
}
