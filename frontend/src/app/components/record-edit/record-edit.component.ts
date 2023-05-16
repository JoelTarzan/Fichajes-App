import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecordsService} from "../../services/records.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../services/events.service";
import {DatePipe, Location} from "@angular/common";

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private eventsService: EventsService,
    private location: Location,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const eventId = parseInt(this.route.snapshot.paramMap.get('eventid')!);
    this.userId = this.route.snapshot.paramMap.get('userid')!;

    this.eventsService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
        this.date = this.datePipe.transform(this.event.date, 'dd-MM-yyyy');

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
      exit: new FormControl(this.record.exit.slice(0, -3), Validators.pattern(timePattern)),
      breakTimeMinutes: new FormControl(this.record.breakTimeMinutes)
    });
  }

  back() {
    this.location.back();
  }

  save() {

  }

  delete() {

  }

}
