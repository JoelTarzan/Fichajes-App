import {Component, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {RecordsService} from "../../services/records.service";
import {UsersService} from "../../services/users.service";
import {RecordRow} from "./recordRow";
import {Router} from "@angular/router";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'entry', 'exit', 'breakTimeMinutes', 'entryExpected', 'exitExpected', 'breakTimeMinutesExpected', 'actions'];
  dataSource: RecordRow[] = [];
  pageSlice: RecordRow[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  totalRecords: number = 0;
  users: any;
  selectedUser: any;
  data: any[] = [];
  userData: any;

  constructor(
    private recordsService: RecordsService,
    private usersService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

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

  async onSelect(user: any) {
    this.selectedUser = user;
    this.getRecords(this.selectedUser.id);
  }

  getRecords(id: string) {
    this.recordsService.getRecordsRow(id).subscribe((result) => {
      this.dataSource = result;
      this.totalRecords = result.length;
      this.pageSlice = this.dataSource.slice(0, this.pageSize);
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pageSlice = this.dataSource.slice(startIndex, endIndex);
  }
}
