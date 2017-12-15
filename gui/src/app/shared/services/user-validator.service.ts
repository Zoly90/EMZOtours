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
}