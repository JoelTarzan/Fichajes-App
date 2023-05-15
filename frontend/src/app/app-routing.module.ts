import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UsersComponent} from "./components/users/users.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {SchedulesComponent} from "./components/schedules/schedules.component";
import {ScheduleEditComponent} from "./components/schedule-edit/schedule-edit.component";
import {ScheduleCreateComponent} from "./components/schedule-create/schedule-create.component";
import {EventsComponent} from "./components/events/events.component";
import {EventEditComponent} from "./components/event-edit/event-edit.component";
import {EventCreateComponent} from "./components/event-create/event-create.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/edit', component: UserEditComponent},
  {path: 'users/create', component: UserCreateComponent},
  {path: 'schedules', component: SchedulesComponent},
  {path: 'schedules/:id/edit', component: ScheduleEditComponent},
  {path: 'schedules/create', component: ScheduleCreateComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id/edit', component: EventEditComponent},
  {path: 'events/create', component: EventCreateComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
