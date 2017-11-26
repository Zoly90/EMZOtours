import { Injectable } from "@angular/core";
import { HttpClientTokenService } from "./http-client.service";
import { UserLogin } from "../models/user-login.model";
import { Observable } from "rxjs/Observable";
import { Http, ResponseContentType } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { UtilsService } from "../../../utils/utils.service";

@Injectable()
export class AuthenticationService {

	private baseUrl = 'api/turism-app/login';

	constructor(
		private _httpClientTokenService: HttpClientTokenService,
		private _http: HttpClient,
		private _utilsService: UtilsService
	) { }

	login(userLogin: UserLogin) {
		return this._http.post(this.baseUrl, userLogin,
			{
				responseType: 'text',
				withCredentials: true
			})
	}

	resetPassword(userLogin: UserLogin): Observable<UserLogin> {
		return this._http.post(`${this.baseUrl}/reset-password`, userLogin)
			.map(res => this._utilsService.parseJSON(res));
	}
}