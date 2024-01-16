import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  userForm !: FormGroup;
  userId: any;
  editUser: any;
  newEndPoint: string = '';
  userList: any;
  userflag: boolean = false;
  usereditflag: boolean = false;
  heading: string = "Add User";
  userAdd: string | null;

  userObj: user = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: 0
  };

  userObj1: user = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: 0
  };



  constructor(private fb: FormBuilder, private ds: DataserviceService, private acvtrout: ActivatedRoute, private router: Router) {
    this.userId = this.acvtrout.snapshot.paramMap.get('id');
    this.userAdd = this.acvtrout.snapshot.queryParamMap.get('action')

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]]
    }
    )

    this.ds.getUsers("users").subscribe((resp) => {
      this.userList = resp;
      console.log(this.userList);

    })

    if (this.userId != null) {
      this.heading = "Edit Details";
      this.newEndPoint = "users/" + this.userId;
      this.ds.getUsers(this.newEndPoint).subscribe((resp) => {
        this.editUser = resp;
        this.userForm.patchValue(this.editUser);
      })

    }

    if (this.userAdd == "edit") {
      this.userObj = this.userObj1;
    }

  }


  getUserDetails() {
    this.userObj.firstName = this.userForm.get('firstName')?.value;
    this.userObj.lastName = this.userForm.get('lastName')?.value;
    this.userObj.address = this.userForm.get('address')?.value;
    this.userObj.email = this.userForm.get('email')?.value;
    this.userObj.phone = this.userForm.get('phone')?.value;
    if (this.userId == null) {
      this.userList?.forEach((element: any) => {
        if (element.email == this.userObj.email ||
          element.phone == this.userObj.phone) {
          this.userflag = true;
        }
      });

      if(this.userflag) {
        alert("User Exits")
      } else {
        this.ds.postUser("users", this.userObj).subscribe((resp) => {
          this.router.navigate(['user-list']);
        })
      }
    } else {
      this.ds.editUserDetails(this.newEndPoint, this.userObj).subscribe((resp) => {
      });
      this.router.navigate(['user-list']);
    }
  }
}
export interface user {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: number;
}

// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/GaneshK245/User-Management-System-.git
// git push -u origin main 