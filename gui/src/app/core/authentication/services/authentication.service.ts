import { Injectable } from "@angular/core";
import { HttpClientTokenService } from "./http-client.service";
import { UserLogin } from "../models/user-login.model";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { UtilsService } from "../../../utils/utils.service";

@Injectable()
export class AuthenticationService {

	private baseUrl = 'api/turism-app/login'

	constructor(
		private _httpClientTokenService: HttpClientTokenService,
		private _http: HttpClient,
		private utilsService: UtilsService
	) { }

	login(userLogin: UserLogin): Observable<string> {
		return this._httpClientTokenService.post(this.baseUrl, userLogin, { withCredentials: true })
			.map(res => res.text() as any);
	}

	resetPassword(userLogin: UserLogin): Observable<UserLogin> {
		return this._http.post(`${this.baseUrl}/reset-password`, userLogin)
			.map(res => this.utilsService.parseJSON(res));
	}
}