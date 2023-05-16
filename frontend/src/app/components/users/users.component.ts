import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;
  userData: any;

  constructor(
    private usersService: UsersService,
    private router: Router) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    if (!this.userData.isAdmin) {
      this.router.navigate(['']);
    }

    this.usersService.getUsers().subscribe(
      (users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}
