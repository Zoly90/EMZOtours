import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService {
    private baseUrl: string = 'api/turism-app'

    constructor(
        private _http: Http
    ) { }

    public getUserLogingIn(username): Observable<User> {
        return this._http.get(`${this.baseUrl}/login/${username}`)
            // .map(res => res.json())
            .map(res => this._parseJSON(res))
    }

    _parseJSON(response) {
        return response.text() ? response.json() : null;
    }
}