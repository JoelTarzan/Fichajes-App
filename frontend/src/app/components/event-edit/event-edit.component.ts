import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {DatePipe, Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  event: any;
  eventDate: any;
  status: any;
  holiday: any;
  sickLeave: any;
  vacation: any;
  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const eventId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.eventsService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
        this.eventDate = this.datePipe.transform(this.event.date, 'dd-MM-yyyy');

        if (this.event.holiday) {
          this.status = 'holiday';

        } else if (this.event.sickLeave) {
          this.status = 'sickLeave';

        } else if (this.event.vacation) {
          this.status = 'vacation';

        } else {
          this.status = 'none';
        }

        this.initForm();
      }
    );
  }

  initForm() {
    this.form = new FormGroup({
      status: new FormControl(this.status)
    });
  }

  back() {
    this.location.back();
  }

  update() {
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

    const event = {
      holiday: this.holiday,
      sickLeave: this.sickLeave,
      vacation: this.vacation
    }

    this.eventsService.updateEvent(this.event.id, event).subscribe(
      () => {
        this.snackBar.open('Evento guardado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  delete() {
    this.eventsService.deleteEvent(this.event.id).subscribe(
      () => {
        this.router.navigate(['/events']);
        this.snackBar.open('Evento eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
