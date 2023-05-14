import {Component, OnInit} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules: any = [];

  constructor(private schedulesService: SchedulesService) {
  }

  ngOnInit(): void {

    this.schedulesService.getSchedules().subscribe(
      (schedules) => {
        this.schedules = schedules;
      }
    );
  }

}
