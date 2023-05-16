import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecordsService} from "../../services/records.service";
import {EventsService} from "../../services/events.service";
import {co} from "@fullcalendar/core/internal-common";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-clockin',
  templateUrl: './clockin.component.html',
  styleUrls: ['./clockin.component.css']
})
export class ClockinComponent implements OnInit {

  userData: any;
  currentTime: Date = new Date();

  clockInButtonEnabled = false;
  clockOutButtonEnabled = false;
  startBreakTimeButtonEnabled = false;
  endBreakTimeButtonEnabled = false;

  breakTimeStart: any;
  breakTimeEnd: any;
  breakTimeMinutes: number = 0;
  totalBreakTimeMinutes: number = 0;

  todayEvent: any;
  todayRecord: any;

  message: string = '';

  constructor(
    private http: HttpClient,
    private recordsService: RecordsService,
    private eventsService: EventsService,
    public datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    this.eventsService.getEventsByUserToday(this.userData.id).subscribe(
      (event) => {

        this.todayEvent = event;

        if (this.todayEvent.vacation) {
          this.message = 'Hoy tienes asignado vacaciones.';
          this.disableButtons();

        } else if (this.todayEvent.holiday) {
          this.message = 'Hoy tienes asignado festivo.';
          this.disableButtons();

        } else if (this.todayEvent.sickLeave) {
          this.message = 'Hoy tienes asignado baja laboral.';
          this.disableButtons();

        } else {

          this.recordsService.getRecordByUserToday(this.userData.id).subscribe(
            (record) => {

              this.todayRecord = record;

              if (this.todayRecord.exit) {
                this.message = 'Hoy ya has terminado tu jornada laboral.';
                this.disableButtons();

              } else {

                if (this.todayRecord.entry) {
                  this.message = 'Recuerda desfichar al acabar tu jornada laboral.';

                  this.clockOutButtonEnabled = true;
                  this.startBreakTimeButtonEnabled = true;
                }

                const storedBreakTimeStart = localStorage.getItem('breakTimeStart');

                if (storedBreakTimeStart) {
                  this.startBreakTimeButtonEnabled = false;
                  this.endBreakTimeButtonEnabled = true;

                  this.breakTimeStart = new Date(storedBreakTimeStart);

                } else {
                  this.startBreakTimeButtonEnabled = true;
                }

              }

            },
            () => {
              this.message = 'Recuerda fichar al empezar tu jornada laboral';

              this.clockInButtonEnabled = true;
            }
          );

        }

      },
      () => {
        this.message = 'Hoy no tienes asignado ningún horario.';
        this.disableButtons();
      }
    );

    const storedTotalBreakTimeMinutes = localStorage.getItem('totalBreakTimeMinutes');

    if (storedTotalBreakTimeMinutes) {
      this.totalBreakTimeMinutes = parseInt(storedTotalBreakTimeMinutes, 10);
    }

  }

  clockIn() {
    const record = {
      date: this.todayEvent.date,
      user: this.userData.id,
      entry: this.datePipe.transform(this.currentTime, 'HH:mm')
    }

    this.recordsService.createRecord(record).subscribe(
      () => {
        this.snackBar.open('Has fichado correctamente', 'Cerrar', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Ha ocurrido algún error', 'Cerrar', {
          duration: 2000,
        });
      }
    );

    this.message = 'Recuerda desfichar al acabar tu jornada laboral.';

    this.clockInButtonEnabled = false;
    this.clockOutButtonEnabled = true;
    this.startBreakTimeButtonEnabled = true;
  }

  clockOut() {

    const record = {
      exit: this.datePipe.transform(this.currentTime, 'HH:mm')
    }

    this.recordsService.getRecordByUserToday(this.userData.id).subscribe(
      (result) => {
        this.todayRecord = result;

        this.recordsService.updateRecord(this.todayRecord.id, record).subscribe(
          () => {
            this.snackBar.open('Has desfichado correctamente', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    );

    this.message = 'Hoy ya has terminado tu jornada laboral.';

    this.breakTimeMinutes = 0;
    this.totalBreakTimeMinutes = 0;
    localStorage.removeItem('totalBreakTimeMinutes');
    this.disableButtons();
  }

  startBreakTime() {
    this.breakTimeStart = new Date();
    localStorage.setItem('breakTimeStart', this.breakTimeStart.toISOString());

    this.startBreakTimeButtonEnabled = false;
    this.endBreakTimeButtonEnabled = true;
  }

  stopBreakTime() {
    this.breakTimeEnd = new Date();
    this.calculateBreakTimeMinutes();

    const record = {
      breakTimeMinutes: this.totalBreakTimeMinutes
    }

    this.recordsService.getRecordByUserToday(this.userData.id).subscribe(
      (result) => {
        this.todayRecord = result;

        this.recordsService.updateRecord(this.todayRecord.id, record).subscribe(
          () => {
            this.snackBar.open('Has guardado la pausa correctamente', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    );

    this.startBreakTimeButtonEnabled = true;
    this.endBreakTimeButtonEnabled = false;
  }

  calculateBreakTimeMinutes() {
    const diff = this.breakTimeEnd.getTime() - this.breakTimeStart.getTime();
    this.breakTimeMinutes = Math.floor(diff / (1000 * 60));
    this.totalBreakTimeMinutes += this.breakTimeMinutes;

    localStorage.setItem('totalBreakTimeMinutes', this.totalBreakTimeMinutes.toString());

    this.breakTimeStart = null;
    this.breakTimeEnd = null;
    this.breakTimeMinutes = 0;

    localStorage.removeItem('breakTimeStart');
  }

  disableButtons() {
    this.clockInButtonEnabled = false;
    this.clockOutButtonEnabled = false;
    this.startBreakTimeButtonEnabled = false;
    this.endBreakTimeButtonEnabled = false;
  }
}
