import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';
import { AuthorizationService } from "./authorization.service";
import { ErrorHandlingService } from "./error-handling.service";
import { Headers } from '@angular/http';

@Injectable()
export class HttpClientTokenService {

	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private errorHandlingService: ErrorHandlingService,
		private router: Router
	) { }

	public get(url: string, options?: RequestOptionsArgs): Observable<any> {
		return this.http.get(url, this._getRequestOptions(options))
			.catch(this._errorHandler.bind(this));
	}

	public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.http.post(url, body, this._getRequestOptions(options))
			.catch(this._errorHandler.bind(this));
	}

	// public authGET(url: string, options?: RequestOptionsArgs): Observable<Response> {
	// 	return this.http.get(url, this._getAuthRequestOptions(options))
	// 		.catch(this._errorHandler.bind(this));
	// }

	public authPOST(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.http.post(url, body, this._getRequestOptions(options))
			.catch(this._errorHandler.bind(this));
	}

	/**
	 * === Private Methods ===
	 * =======================
	 */
	private _getRequestOptions(options) {
		options = options ? options : null;
		options.headers = options.headers ? options.headers : new HttpHeaders();
		return options.headers;
	}

	private _getAuthRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
		options = this._getRequestOptions(options);
		options.headers = _.assign(options.headers, this.authorizationService.authorizationHeaders)
		return options;
	}

	private _errorHandler(err) {
		this.errorHandlingService.handleHttpError(err)
		return Observable.throw(err);
	}
}