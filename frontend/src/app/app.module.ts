import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { UserCreateComponent } from './components/user-create/user-create.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ScheduleEditComponent } from './components/schedule-edit/schedule-edit.component';
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ScheduleCreateComponent } from './components/schedule-create/schedule-create.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { EventsComponent } from './components/events/events.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import {MatCardModule} from "@angular/material/card";
import {DatePipe} from "@angular/common";
import {MatRadioModule} from "@angular/material/radio";
import { EventCreateComponent } from './components/event-create/event-create.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { RecordsComponent } from './components/records/records.component';
import { RecordEditComponent } from './components/record-edit/record-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserEditComponent,
    UserCreateComponent,
    SchedulesComponent,
    ScheduleEditComponent,
    ScheduleCreateComponent,
    EventsComponent,
    EventEditComponent,
    EventCreateComponent,
    RecordsComponent,
    RecordEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        HttpClientModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        NgxMatTimepickerModule,
        MatCheckboxModule,
        FullCalendarModule,
        MatCardModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
