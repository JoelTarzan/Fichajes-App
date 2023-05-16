import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecordsService} from "../../services/records.service";
import {FormControl, FormGroup} from "@angular/forms";
import {EventsService} from "../../services/events.service";

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
    private eventsService: EventsService) {
  }

  ngOnInit() {
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
              //TODO initFormEdit
            }
          );

        }
      }
    );

  }

  initFormCreate(): void {
    this.form = new FormGroup({
      entry: new FormControl(''),
      exit: new FormControl(''),

    });
  }

}
