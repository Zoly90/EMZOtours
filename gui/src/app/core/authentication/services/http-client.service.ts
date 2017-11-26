import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';
import { AuthorizationService } from "./authorization.service";
import { ErrorHandlingService } from "./error-handling.service";
import { Headers, ResponseContentType } from '@angular/http';
import { UtilsService } from "../../../utils/utils.service";

@Injectable()
export class HttpClientTokenService {

	constructor(
		private _http: HttpClient,
		private _authorizationService: AuthorizationService,
		private _errorHandlingService: ErrorHandlingService
	) { }

	// public authGET(url: string, options?: RequestOptionsArgs): Observable<Response> {
	// 	return this._http.get(url, this._getAuthRequestOptions(options))
	// 		.catch(this._errorHandler.bind(this));
	// }

	// public authPOST(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
	// 	return this._http.post(url, body, this._getRequestOptions(options))
	// 		.catch(this._errorHandler.bind(this));
	// }

	/**
	 * === Private Methods ===
	 * =======================
	 */
	// private _getRequestOptions(options) {
	// 	options = options ? options : null;
	// 	options.headers = options.headers ? options.headers : new HttpHeaders();
	// 	options.withCredentials = true;
	// 	options.responseType = ResponseContentType.Text;
	// 	return options;
	// }

	// private _getAuthRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
	// 	options = this._getRequestOptions(options);
	// 	options.headers = _.assign(options.headers, this._authorizationService.authorizationHeaders)
	// 	return options;
	// }

	// private _errorHandler(err) {
	// 	this._errorHandlingService.handleHttpError(err)
	// 	return Observable.throw(err);
	// }
}