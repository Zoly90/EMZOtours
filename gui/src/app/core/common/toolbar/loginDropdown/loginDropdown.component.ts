import { Component } from '@angular/core';
import { LoginService } from "../../../services/login.service";
import { User } from "../../../models/user.model";

@Component({
  selector: 'sd-login',
  templateUrl: './loginDropdown.component.html',
  styleUrls: ['./loginDropdown.component.css']
})
export class LoginDropdownComponent {

  private loginSuccessfull: boolean;
  private userLogedIn: User = null;
  private usernameExists: boolean = true;

  private username: string;
  private password: string;

  constructor(
    private loginService: LoginService
  ) { }

  public login() {
    this.loginService.getUserLogingIn(this.username).subscribe(data => {
      console.log(data);
      this.userLogedIn = data;

      if (this.userLogedIn == null || this.userLogedIn.userLogin.password == this.password) {
        console.log('ceva');
        this.loginSuccessfull = true;
      } else if (this.userLogedIn == null || this.userLogedIn.userLogin.username != this.username) {
        this.usernameExists = false;
      }
      console.log(this.loginSuccessfull);
    });
  }

  public resetPassword(username) {
    // this.usernameExists = this.loginService.getCredentials(username);
    this.usernameExists = true;
  }

  public toggleForgotPasswordModal() {
    console.log('modal opened');
  }



  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }
}