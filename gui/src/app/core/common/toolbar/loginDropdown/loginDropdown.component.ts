import { Component, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../../authentication/services/authentication.service";
import { UserLogin } from "../../../authentication/models/user-login.model";
import { UserValidatorService } from "../../../services/user-validator.service";
import { AuthorizationService } from "../../../authentication/services/authorization.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../../../utils/utils.service";
import { TurismAppConstants } from "../../../../utils/constants";
import { Subscription } from "rxjs/Subscription";
import { LoginDropdownService } from "./login-dropdown.service";
import { BsDropdownDirective } from "ngx-bootstrap/dropdown";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ResetPasswordModalComponent } from "./reset-password-modal/reset-password-modal.component";

@Component({
  selector: 'sd-login',
  templateUrl: './loginDropdown.component.html',
  styleUrls: ['./loginDropdown.component.scss']
})
export class LoginDropdownComponent {

  @Output() onLoginSuccessful = new EventEmitter();

  @ViewChild(BsDropdownDirective) dropdown;

  private isOpenChange: Subscription;
  private outsideButton: Subscription;

  private resetPasswordModal: BsModalRef;

  private loginSuccessfull: boolean = false;
  private wrongCredentials: string = '';
  private username: string;
  private password: string;

  public status: { isopen: boolean } = { isopen: false };

  constructor(
    private _authenticationService: AuthenticationService,
    private _authorizationService: AuthorizationService,
    // private _router: Router,
    private _utilsService: UtilsService,
    private _loginDropdownService: LoginDropdownService,
    private _modalService: BsModalService
  ) {
    this.outsideButton = this._loginDropdownService.$mouseEvent
      .subscribe(mouseEvent => this.toggleDropdown(mouseEvent));
  }

  ngOnInit() {
    this.isOpenChange = this.dropdown._state.isOpenChange.subscribe(isOpen => {
      this.status.isopen = isOpen
    })
  }

  ngOnDestroy() {
    this.outsideButton.unsubscribe();
    this.isOpenChange.unsubscribe();
  }

  public toggleDropdown($event): void {
    // $event.mouseEvent.preventDefault();
    // $event.mouseEvent.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public login() {

    let userLogin: UserLogin = new UserLogin();

    userLogin = this._loginDropdownService._checkIfIsEmail(userLogin, this.username);
    userLogin.password = this._utilsService.encode(this.password);

    this._authenticationService.login(userLogin)
      .subscribe(res => {
        if (res != null && res != '') {
          this._authorizationService.setCredentials(res);
          // this._router.navigateByUrl('/');
          this.loginSuccessfull = true;
          this.onLoginSuccessful.emit(this.loginSuccessfull);
        } else {
          this.wrongCredentials = TurismAppConstants.WRONG_CREDENTIALS;
          this.password = null;
        }
      })
  }

  public openResetPasswordModal() {
    this.resetPasswordModal = this._modalService.show(ResetPasswordModalComponent, { class: 'modal-sm' });
    this.loginSuccessfull = false;
  }
}