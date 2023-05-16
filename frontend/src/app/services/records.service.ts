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
    const events$ = this.http.get<any[]>(this.endpoint + '/events/all/' + id);
    const records$ = this.http.get<any[]>(this.endpoint + '/records/all/' + id);

    return forkJoin([events$, records$]).pipe(
      map(([eventsResult, recordsResult]) => {
        const formattedEvents: RecordRow[] = this.formatEvents(eventsResult);
        const formattedRecords: RecordRow[] = this.formatRecords(recordsResult);

        return formattedEvents.map(event => ({
          ...event,
          entry: this.searchEntry(formattedRecords, event.date),
          exit: this.searchExit(formattedRecords, event.date),
          breakTimeMinutes: this.searchBreakTimeMinutes(formattedRecords, event.date)
        }));
      })
    );
  }

  getRecordsByUser(id: string): Observable<any> {
    return this.http.get(this.endpoint + '/records/all/' + id);
  }

  private formatEvents(events: any[]): RecordRow[] {
    return events.map(event => ({
      date: event.date,
      entryExpected: event.entryHour,
      exitExpected: event.exitHour,
      breakTimeMinutesExpected: event.breakTimeMinutesExpected
    }));
  }

  formatRecords(records: any[]): RecordRow[] {
    return records.map(record => ({
      date: record.date,
      entry: record.entry,
      exit: record.exit,
      breakTimeMinutes: record.breakTimeMinutes
    }));
  }

  searchEntry(records: RecordRow[], date: string | undefined): string | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.entry : undefined;
  }

  searchExit(records: RecordRow[], date: string | undefined): string | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.exit : undefined;
  }

  searchBreakTimeMinutes(records: RecordRow[], date: string | undefined): number | undefined {
    const record = records.find(record => record.date === date);
    return record ? record.breakTimeMinutes : undefined;
  }
}
