import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SchedulesService} from "../../services/schedules.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private schedulesService: SchedulesService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      mondayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      mondayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      mondayBreakTimeMinutes: new FormControl(0),
      workOnMonday: new FormControl(false),
      tuesdayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      tuesdayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      tuesdayBreakTimeMinutes: new FormControl(0),
      workOnTuesday: new FormControl(false),
      wednesdayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      wednesdayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      wednesdayBreakTimeMinutes: new FormControl(0),
      workOnWednesday: new FormControl(false),
      thursdayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      thursdayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      thursdayBreakTimeMinutes: new FormControl(0),
      workOnThursday: new FormControl(false),
      fridayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      fridayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      fridayBreakTimeMinutes: new FormControl(0),
      workOnFriday: new FormControl(false),
      saturdayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      saturdayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      saturdayBreakTimeMinutes: new FormControl(0),
      workOnSaturday: new FormControl(false),
      sundayEntry: new FormControl('00:00', Validators.pattern(timePattern)),
      sundayExit: new FormControl('00:00', Validators.pattern(timePattern)),
      sundayBreakTimeMinutes: new FormControl(0),
      workOnSunday: new FormControl(false)
    });
  }

  back() {
    this.location.back();
  }

  createSchedule() {
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

    this.schedulesService.createSchedule(schedule).subscribe(
      () => {
        this.router.navigate(['/schedules']);
        this.snackBar.open('Horario creado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
