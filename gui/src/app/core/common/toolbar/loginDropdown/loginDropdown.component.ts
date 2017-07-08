import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from "../../../authentication/services/authentication.service";
import { UserLogin } from "../../../authentication/models/user-login.model";
import { UserValidatorService } from "../../../services/user-validator.service";
import { AuthorizationService } from "../../../authentication/services/authorization.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../../../utils/utils.service";
import { TurismAppConstants } from "../../../../utils/constants";

@Component({
  selector: 'sd-login',
  templateUrl: './loginDropdown.component.html',
  styleUrls: ['./loginDropdown.component.scss']
})
export class LoginDropdownComponent {

  @Output() onLoginSuccessful = new EventEmitter();

  private loginSuccessfull: boolean = false;
  private wrongCredentials: string = '';
  private usernameExists: string = '';

  private username: string;
  private password: string;

  constructor(
    private _authenticationService: AuthenticationService,
    private _userValidatorService: UserValidatorService,
    private _authorizationService: AuthorizationService,
    private _router: Router,
    private _utilsService: UtilsService
  ) { }

  public login() {

    const userLogin: UserLogin = new UserLogin();

    this._checkIfIsEmail(userLogin);
    userLogin.password = this._utilsService.encodePassword(this.password);

    this._authenticationService.login(userLogin)
      .subscribe(res => {
        if (res != null && res != '') {
          this._authorizationService.setCredentials(res);
          this._router.navigateByUrl('/');
          this.loginSuccessfull = true;
          this.onLoginSuccessful.emit(this.loginSuccessfull);
        } else {
          this.wrongCredentials = TurismAppConstants.WRONG_CREDENTIALS;
          this.password = null;
        }
      })
  }

  public forgotPassword() {

    const userLogin: UserLogin = new UserLogin();

    this._checkIfIsEmail(userLogin);

    this._authenticationService.resetPassword(userLogin)
      .subscribe(data => {
        if (data != null && data != '') {
          this.usernameExists = TurismAppConstants.RESET_PASSWORD_USERNAME_EXISTS;
        } else {
          this.usernameExists = TurismAppConstants.RESET_PASSWORD_USERNAME_NOT_EXISTS;
        }
      });
  }

  public closeForgotPasswordModal() {
    if (this.usernameExists === TurismAppConstants.RESET_PASSWORD_USERNAME_NOT_EXISTS) {
      this.username = null;
    }
    this.loginSuccessfull = false;
    this.usernameExists = '';
  }

  private _checkIfIsEmail(userLogin: UserLogin) {
    if (this._userValidatorService.validateEmailAddressForInput(this.username)) {
      userLogin.emailAddress = this.username;
    } else {
      userLogin.username = this.username;
    }
  }
}