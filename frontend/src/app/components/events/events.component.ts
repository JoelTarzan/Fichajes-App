import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import {UsersService} from "../../services/users.service";
import {EventsService} from "../../services/events.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  users: any;
  selectedUser: any;
  events: any[] = [];
  userData: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: esLocale,
    contentHeight: '70vh',
    events: this.events,
    eventClick: this.handleEventClick.bind(this)
  }

  constructor(
    private usersService: UsersService,
    private eventsService: EventsService,
    private router: Router) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    if (!this.userData.isAdmin) {
      this.router.navigate(['']);
    }

    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

  onSelect(user: any) {
    this.events = [];
    this.selectedUser = user;

    this.eventsService.getEventsByUser(user.id).subscribe(
      (events) => {

        events.forEach((event: any) => {

          let colorStatus: any;

          if (event.vacation) {
            colorStatus = '#d8ba62';

          } else if (event.sickLeave) {
            colorStatus = '#ed8790';

          } else if (event.holiday) {
            colorStatus = '#7dbfb8';

          } else {
            colorStatus = '#A2B29F';

          }

          const eventObject = {
            title: event.name,
            start: event.date,
            id: event.id,
            backgroundColor: colorStatus,
            borderColor: colorStatus
          }

          this.events.push(eventObject);
        });

        this.calendarOptions.events = this.events;
      }
    );
  }

  handleEventClick(eventInfo: any) {
    const eventId = eventInfo.event.id;
    this.router.navigate(['/events', eventId, 'edit']);
  }

}
