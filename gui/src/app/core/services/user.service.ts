import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";
import { UserCreditCard } from "../authentication/models/user-credit-card.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    private baseUrl: string = 'api/turism-app/user'

    constructor(
        private _http: HttpClient
    ) { }

    public addUser(newUser: User) {
        // return this._http.post(`${this.baseUrl}/registration`, newUser)
        //     .map(res => {
        //         return res.json();
        //     });
        console.log(newUser)
    }

    public getUser(id: number): Observable<any> {
        return this._http.get(`${this.baseUrl}/${id}`)
            .map(res => {
                return res;
            });
    }

    public getAllUsers(): Observable<any> {
        return this._http.get(`${this.baseUrl}`)
            .map(res => {
                return res;
            });
    }

    public updateUser(user: User): Observable<any> {
        return this._http.post(`${this.baseUrl}`, user)
            .map(res => {
                return res;
            });
    }

    public deleteUser(id: number) {
        return this._http.delete(`${this.baseUrl}/${id}`);
    }

    public getUserCreditCardData(id: number): Observable<any> {
        return this._http.get(`${this.baseUrl}/${id}/credit-card-data`)
            .map(res => {
                return res;
            });
    }
}