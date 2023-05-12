import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

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

  constructor(private usersService: UsersService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {

    this.usersService.getUsers().subscribe(
      (users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}
