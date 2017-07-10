import { Injectable } from "@angular/core";
import { Headers } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthorizationService {
	_authorizationHeaders: Headers;

	constructor() { }

	public isAuthenticated() {
		let token = localStorage.getItem('token');
		return token && !this._isTokenExpired(token);
	}

	public setCredentials(token: string) {
		localStorage.setItem('token', token);
		this._setAuthorizationHeader(token);
	}

	public get authorizationHeaders() {
		return this._authorizationHeaders;
	}

	public clearCredentials() {
		localStorage.removeItem('token');
		this._clearAuthorizationHeader();
	}

	public loadCredentials() {
		let token = localStorage.getItem('token');
		if (token && !this._isTokenExpired(token)) {
			this._setAuthorizationHeader(token);
		}
	}
	
	public getDecodedToken() {
		let token = localStorage.getItem('token');
		if (token == null) {
			return
		}
		return jwtDecode(token);
	}

	/**
	 * Private Methods
	 * ===============
	 */
	private _isTokenExpired(token: string, offsetSeconds?: number): boolean {
		let decoded = jwtDecode(token);

		if (!decoded.hasOwnProperty('exp')) {
			return null;
		}

		let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
		date.setUTCSeconds(decoded.exp);

		offsetSeconds = offsetSeconds || 0;

		if (date == null) {
			return false;
		}

		return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
	}

	private _setAuthorizationHeader(token) {
		this._authorizationHeaders = new Headers({
			'x-access-token': token
		});
	}

	private _clearAuthorizationHeader() {
		this._authorizationHeaders = new Headers();
	}
}