import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from "./user-management.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'user-management', component: UserManagementComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }