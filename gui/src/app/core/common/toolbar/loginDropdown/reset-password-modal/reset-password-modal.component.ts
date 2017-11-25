import { Component } from "@angular/core";
import { UserLogin } from "../../../../authentication/models/user-login.model";
import { AuthenticationService } from "../../../../authentication/services/authentication.service";
import { TurismAppConstants } from "../../../../../utils/constants";
import { LoginDropdownService } from "../login-dropdown.service";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
	selector: 'reset-password-modal',
	templateUrl: './reset-password-modal.component.html',
	styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {

	private username: string;
	private usernameExists: string;

	constructor(
		private _bsModalRef: BsModalRef,
		private _authenticationService: AuthenticationService,
		private _loginDropdownService: LoginDropdownService
	) { }

	public forgotPassword() {

		let userLogin: UserLogin = new UserLogin();

		userLogin = this._loginDropdownService._checkIfIsEmail(userLogin, this.username);

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
		this.usernameExists = '';
		this._bsModalRef.hide();
	}
}