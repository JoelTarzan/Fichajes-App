import {Component, OnInit} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules: any = [];
  userData: any;

  constructor(
    private schedulesService: SchedulesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    if (!this.userData.isAdmin) {
      this.router.navigate(['']);
    }

    this.schedulesService.getSchedules().subscribe(
      (schedules) => {
        this.schedules = schedules;
      }
    );
  }

}
