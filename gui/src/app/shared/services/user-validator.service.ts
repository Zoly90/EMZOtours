import { Injectable } from "@angular/core";
import { UtilsService } from "../../utils/utils.service";
import { User } from "../models/user.model";
import { UserLogin } from "../../core/authentication/models/user-login.model";

@Injectable()
export class UserValidatorService {

	private emailRegexPattern: any;
	private telephoneNumberRegexPattern: any;

	constructor(
		private utilsService: UtilsService
	) { }

	public validateUsernameLength(userLogin: UserLogin) {
		let result: boolean = true;
		if (userLogin.username != null && userLogin.username.length < 6 || userLogin.username.length > 32) {
			result = false;
		}
		return result;
	}

	public validateEmailAddress(userLogin: UserLogin) {
		let result: boolean = true;
		if (!this.emailRegexPattern) {
			this.emailRegexPattern = this.utilsService.getEmailRegexPattern();
		}
		if (!this.emailRegexPattern.test(userLogin.emailAddress)) {
			result = false;
		}
		return result;
	}

	public validateEmailAddressForInput(username: string) {
		let result: boolean = true;
		if (!this.emailRegexPattern) {
			this.emailRegexPattern = this.utilsService.getEmailRegexPattern();
		}
		if (!this.emailRegexPattern.test(username)) {
			result = false;
		}
		return result;
	}

	public validatePasswordLength(userLogin: UserLogin) {
		let result: boolean = true;
		if (userLogin.password != null && userLogin.password.length < 8 || userLogin.password.length > 32) {
			result = false;
		}
		return result;
	}

	public validatePasswordEquality(userLogin: UserLogin) {
		let result: boolean = true;
		if (userLogin.password === userLogin.passwordConfirm) {
			result = false;
		}
		return result;
	}

	public validateTelephoneNumber(user: User) {
		let result: boolean = true;
		if (!this.telephoneNumberRegexPattern) {
			this.telephoneNumberRegexPattern = this.utilsService.getPhoneNumberRegex();
		}
		if (!this.telephoneNumberRegexPattern.test(user.telephoneNr)) {
			result = false;
		}
		return result;
	}
}