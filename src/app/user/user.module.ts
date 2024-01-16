import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      
      { path: 'user-list', component: UserListComponent },
      { path: 'upsert', component: UserUpsertComponent },
      {path : '' ,redirectTo:'upsert', pathMatch : 'full'}
    ])
  ]
})
export class UserModule { }
