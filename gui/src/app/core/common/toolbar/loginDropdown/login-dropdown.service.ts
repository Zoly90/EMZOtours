import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { UserValidatorService } from "../../../services/user-validator.service";
import { UserLogin } from "../../../authentication/models/user-login.model";

@Injectable()
export class LoginDropdownService {

	constructor(
		private _userValidatorService: UserValidatorService,
	) { }

	private _mouseEvent: Subject<any> = new Subject<MouseEvent>();

	get $mouseEvent() {
		return this._mouseEvent.asObservable();
	}

	public toggleDropdown(event: MouseEvent) {
		this._mouseEvent.next({ mouseEvent: event })
	}

	public _checkIfIsEmail(userLogin: UserLogin, username: string) {
		if (this._userValidatorService.validateEmailAddressForInput(username)) {
			userLogin.emailAddress = username;
		} else {
			userLogin.username = username;
		}
		return userLogin;
	}
} 