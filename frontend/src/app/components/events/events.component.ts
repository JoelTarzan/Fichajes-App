import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  users: any;
  selectedUser: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: esLocale,
    contentHeight: '70vh',
    events: [{
      title: 'Horario Joel',
      start: '2023-05-01',
      userId: 1,
      scheduleId: 1,
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50'
    },
      {
        title: 'Evento 2',
        start: '2023-05-10',
        userId: 2,
        scheduleId: 2,
        backgroundColor: '#3F51B5',
        borderColor: '#3F51B5'
      },
      {
        title: 'Evento 3',
        start: '2023-05-20',
        userId: 3,
        scheduleId: 3,
        backgroundColor: '#9C27B0',
        borderColor: '#9C27B0'
      }]
  }

  constructor(
    private usersService: UsersService,) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

  onSelect(user: any) {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

}
