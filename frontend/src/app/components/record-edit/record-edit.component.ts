import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecordsService} from "../../services/records.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../services/events.service";
import {DatePipe, Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css']
})
export class RecordEditComponent implements OnInit {

  mode: any;
  record: any;
  event: any;
  userId: any;
  date: any;
  form!: FormGroup;
  userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private eventsService: EventsService,
    private location: Location,
    public datePipe: DatePipe,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    if (!this.userData.isAdmin) {
      this.router.navigate(['']);
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    const eventId = parseInt(this.route.snapshot.paramMap.get('eventid')!);
    this.userId = this.route.snapshot.paramMap.get('userid')!;

    this.eventsService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
        this.date = this.event.date;

        if (id == 'undefined') {
          this.mode = 'create';
          this.initFormCreate();

        } else {
          this.mode = 'edit';

          this.recordsService.getRecordsById(id).subscribe(
            (record) => {
              this.record = record;
              this.initFormEdit();
            }
          );
        }

      }
    );

  }

  initFormCreate(): void {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    this.form = new FormGroup({
      entry: new FormControl('', [Validators.required, Validators.pattern(timePattern)]),
      exit: new FormControl(null, Validators.pattern(timePattern)),
      breakTimeMinutes: new FormControl(0)
    });
  }

  initFormEdit(): void {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    this.form = new FormGroup({
      entry: new FormControl(this.record.entry.slice(0, -3), [Validators.required, Validators.pattern(timePattern)]),
      exit: new FormControl(this.record.exit ? this.record.exit.slice(0, -3) : null, Validators.pattern(timePattern)),
      breakTimeMinutes: new FormControl(this.record.breakTimeMinutes)
    });
  }

  back() {
    this.location.back();
  }

  save() {

    if (this.mode == 'create') {

      const record = {
        date: this.date,
        user: this.userId,
        entry: this.form.get('entry')?.value,
        exit: this.form.get('exit')?.value,
        breakTimeMinutes: this.form.get('breakTimeMinutes')?.value
      }

      this.recordsService.createRecord(record).subscribe(
        () => {
          this.router.navigate(['/records']);
          this.snackBar.open('Registro creado correctamente', 'Cerrar', {
            duration: 2000,
          });
        }
      );

    } else {

      const record = {
        entry: this.form.get('entry')?.value,
        exit: this.form.get('exit')?.value ? this.form.get('exit')?.value : null,
        breakTimeMinutes: this.form.get('breakTimeMinutes')?.value
      }

      this.recordsService.updateRecord(this.record.id, record).subscribe(
        () => {
          this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
            duration: 2000,
          });
        }
      );
    }

  }

  delete() {
    this.recordsService.deleteRecord(this.record.id).subscribe(
      () => {
        this.router.navigate(['/records']);
        this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
