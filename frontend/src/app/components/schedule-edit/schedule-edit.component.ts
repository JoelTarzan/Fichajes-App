import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SchedulesService} from "../../services/schedules.service";
import {DatePipe, Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {

  schedule: any;
  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schedulesService: SchedulesService,
    private location: Location,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.schedulesService.getScheduleById(id).subscribe(
      (schedule) => {
        this.schedule = schedule;
        this.initForm();
      }
    );
  }

  initForm(): void {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    this.form = new FormGroup({
      name: new FormControl(this.schedule.name),
      mondayEntry: new FormControl(this.schedule.mondayEntry.slice(0, -3), Validators.pattern(timePattern)),
      mondayExit: new FormControl(this.schedule.mondayExit.slice(0, -3), Validators.pattern(timePattern)),
      mondayBreakTimeMinutes: new FormControl(this.schedule.mondayBreakTimeMinutes),
      workOnMonday: new FormControl(this.schedule.workOnMonday),
      tuesdayEntry: new FormControl(this.schedule.tuesdayEntry.slice(0, -3), Validators.pattern(timePattern)),
      tuesdayExit: new FormControl(this.schedule.tuesdayExit.slice(0, -3), Validators.pattern(timePattern)),
      tuesdayBreakTimeMinutes: new FormControl(this.schedule.tuesdayBreakTimeMinutes),
      workOnTuesday: new FormControl(this.schedule.workOnTuesday),
      wednesdayEntry: new FormControl(this.schedule.wednesdayEntry.slice(0, -3), Validators.pattern(timePattern)),
      wednesdayExit: new FormControl(this.schedule.wednesdayExit.slice(0, -3), Validators.pattern(timePattern)),
      wednesdayBreakTimeMinutes: new FormControl(this.schedule.wednesdayBreakTimeMinutes),
      workOnWednesday: new FormControl(this.schedule.workOnWednesday),
      thursdayEntry: new FormControl(this.schedule.thursdayEntry.slice(0, -3), Validators.pattern(timePattern)),
      thursdayExit: new FormControl(this.schedule.thursdayExit.slice(0, -3), Validators.pattern(timePattern)),
      thursdayBreakTimeMinutes: new FormControl(this.schedule.thursdayBreakTimeMinutes),
      workOnThursday: new FormControl(this.schedule.workOnThursday),
      fridayEntry: new FormControl(this.schedule.fridayEntry.slice(0, -3), Validators.pattern(timePattern)),
      fridayExit: new FormControl(this.schedule.fridayExit.slice(0, -3), Validators.pattern(timePattern)),
      fridayBreakTimeMinutes: new FormControl(this.schedule.fridayBreakTimeMinutes),
      workOnFriday: new FormControl(this.schedule.workOnFriday),
      saturdayEntry: new FormControl(this.schedule.saturdayEntry.slice(0, -3), Validators.pattern(timePattern)),
      saturdayExit: new FormControl(this.schedule.saturdayExit.slice(0, -3), Validators.pattern(timePattern)),
      saturdayBreakTimeMinutes: new FormControl(this.schedule.saturdayBreakTimeMinutes),
      workOnSaturday: new FormControl(this.schedule.workOnSaturday),
      sundayEntry: new FormControl(this.schedule.sundayEntry.slice(0, -3), Validators.pattern(timePattern)),
      sundayExit: new FormControl(this.schedule.sundayExit.slice(0, -3), Validators.pattern(timePattern)),
      sundayBreakTimeMinutes: new FormControl(this.schedule.sundayBreakTimeMinutes),
      workOnSunday: new FormControl(this.schedule.workOnSunday)
    });
  }

  back() {
    this.location.back();
  }

  update() {
    const schedule = {
      name: this.form.get('name')?.value,
      mondayEntry: this.form.get('mondayEntry')?.value,
      mondayExit: this.form.get('mondayExit')?.value,
      mondayBreakTimeMinutes: this.form.get('mondayBreakTimeMinutes')?.value,
      workOnMonday: this.form.get('workOnMonday')?.value,
      tuesdayEntry: this.form.get('tuesdayEntry')?.value,
      tuesdayExit: this.form.get('tuesdayExit')?.value,
      tuesdayBreakTimeMinutes: this.form.get('tuesdayBreakTimeMinutes')?.value,
      workOnTuesday: this.form.get('workOnTuesday')?.value,
      wednesdayEntry: this.form.get('wednesdayEntry')?.value,
      wednesdayExit: this.form.get('wednesdayExit')?.value,
      wednesdayBreakTimeMinutes: this.form.get('wednesdayBreakTimeMinutes')?.value,
      workOnWednesday: this.form.get('workOnWednesday')?.value,
      thursdayEntry: this.form.get('thursdayEntry')?.value,
      thursdayExit: this.form.get('thursdayExit')?.value,
      thursdayBreakTimeMinutes: this.form.get('thursdayBreakTimeMinutes')?.value,
      workOnThursday: this.form.get('workOnThursday')?.value,
      fridayEntry: this.form.get('fridayEntry')?.value,
      fridayExit: this.form.get('fridayExit')?.value,
      fridayBreakTimeMinutes: this.form.get('fridayBreakTimeMinutes')?.value,
      workOnFriday: this.form.get('workOnFriday')?.value,
      saturdayEntry: this.form.get('saturdayEntry')?.value,
      saturdayExit: this.form.get('saturdayExit')?.value,
      saturdayBreakTimeMinutes: this.form.get('saturdayBreakTimeMinutes')?.value,
      workOnSaturday: this.form.get('workOnSaturday')?.value,
      sundayEntry: this.form.get('sundayEntry')?.value,
      sundayExit: this.form.get('sundayExit')?.value,
      sundayBreakTimeMinutes: this.form.get('sundayBreakTimeMinutes')?.value,
      workOnSunday: this.form.get('workOnSunday')?.value
    }

    this.schedulesService.updateSchedule(this.schedule.id, schedule).subscribe(
      () => {
        this.snackBar.open('Horario guardado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  delete() {
    this.schedulesService.deleteSchedule(this.schedule.id).subscribe(
      () => {
        this.router.navigate(['/schedules']);
        this.snackBar.open('Horario eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
