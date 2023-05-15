import {Component, OnInit} from '@angular/core';
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {FormControl, FormGroup, FormRecord, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {SchedulesService} from "../../services/schedules.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  form!: FormGroup;
  users: any;
  selectedUser: any;
  schedules: any;
  selectedSchedule: any;
  holiday: any;
  sickLeave: any;
  vacation: any;

  constructor(
    private location: Location,
    private router: Router,
    private eventsService: EventsService,
    private usersService: UsersService,
    private schedulesService: SchedulesService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );

    this.schedulesService.getSchedules().subscribe(
      (schedules) => {
        this.schedules = schedules;
      }
    );
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      user: new FormControl(null, Validators.required),
      schedule: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      status: new FormControl('none', Validators.required)
    });
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
  }

  onSelectSchedule(schedule: any) {
    this.selectedSchedule = schedule;
  }

  back() {
    this.location.back();
  }

  createEvent() {
    const dates = [];

    const startDate = this.datePipe.transform(this.form.get('startDate')?.value, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(this.form.get('endDate')?.value, 'yyyy-MM-dd');

    if (startDate && endDate) {

      let startDateFormatted = new Date(startDate);
      let endDateFormatted = new Date(endDate);

      for (let date = startDateFormatted; date <= endDateFormatted; date.setDate(date.getDate() + 1)) {

        let day = date.getDay();

        if (day == 0 && this.selectedSchedule.workOnSunday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 1 && this.selectedSchedule.workOnMonday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 2 && this.selectedSchedule.workOnTuesday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 3 && this.selectedSchedule.workOnWednesday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 4 && this.selectedSchedule.workOnThursday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 5 && this.selectedSchedule.workOnFriday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));

        } else if (day == 6 && this.selectedSchedule.workOnSaturday) {
          dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd'));
        }
      }
    }

    const actualStatus = this.form.get('status')?.value;

    if (actualStatus == 'holiday') {
      this.holiday = true;
      this.sickLeave = false;
      this.vacation = false;

    } else if (actualStatus == 'sickLeave') {
      this.holiday = false;
      this.sickLeave = true;
      this.vacation = false;

    } else if (actualStatus == 'vacation') {
      this.holiday = false;
      this.sickLeave = false;
      this.vacation = true;

    } else {
      this.holiday = false;
      this.sickLeave = false;
      this.vacation = false;

    }

    const events: any[] = [];

    dates.forEach((date) => {
      const event = {
        user: this.selectedUser.id,
        schedule: this.selectedSchedule.id,
        date: date,
        holiday: this.holiday,
        sickLeave: this.sickLeave,
        vacation: this.vacation
      }

      events.push(event);
    });

    events.forEach((event) => {
      this.eventsService.createEvent(event).subscribe();
    });

    this.router.navigate(['/events']);
    this.snackBar.open('Horarios aplicados correctamente', 'Cerrar', {
      duration: 2000,
    });
  }

}
