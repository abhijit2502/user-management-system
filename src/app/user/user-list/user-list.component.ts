import { Component } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  usersArr: any;

  constructor(private ds: DataserviceService, private router: Router) {

  }

  ngOnInit() {
    this.ds.getUsers('users').subscribe((resp) => {
      this.usersArr = resp;
    })
  }
  editData(id: number) {
    this.router.navigate(['upsert', { id: id }])
  }


  deleteData(id: number) {
    let Endpoint = "users/" + id;

    this.ds.deleteUser(Endpoint, id).subscribe((resp) => {
      window.location.reload()
    })
  }

  toUpsert(){
    this.router.navigate(['upsert',{ action: "edit" }]);
  }
}
