import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from "../../../services/login.service";
import { User } from "../../../models/user.model";

@Component({
  selector: 'sd-login',
  templateUrl: './loginDropdown.component.html',
  styleUrls: ['./loginDropdown.component.scss']
})
export class LoginDropdownComponent {

  @Output() onLoginSuccessful = new EventEmitter();

  private loginSuccessfull: boolean = false;
  private userLogedIn: User = new User();
  private usernameExists: boolean = false;

  private usernameFetched: boolean = false;

  private username: string;
  private password: string;

  constructor(
    private loginService: LoginService
  ) { }

  public login() {
    this.loginService.getUserLogingIn(this.username).subscribe(data => {
      if (data != null) {
        this.userLogedIn = data;
        if (this.userLogedIn.userLogin.password == this.password) {
          this.loginSuccessfull = true;
          this.onLoginSuccessful.emit(this.loginSuccessfull);
          this.usernameExists = true;
        } else {
          this.usernameExists = true;
        }
      } else {
        this.userLogedIn = null;
      }
    });
  }

  public resetPassword() {
    if (this.userLogedIn != null && this.userLogedIn.userLogin.username == this.username) {
      this.usernameFetched = true;
    } else {
      this.loginService.getUserLogingIn(this.username).subscribe(data => {
        if (data != null) {
          this.userLogedIn = data;
          this.usernameFetched = true;
        } else {
          this.userLogedIn = null;
        }
      });
    }
  }

  public closeForgotPasswordModal() {
    this.loginSuccessfull = false;
    this.usernameExists = false;
    this.usernameFetched = false;
    this.userLogedIn = new User();
  }
}