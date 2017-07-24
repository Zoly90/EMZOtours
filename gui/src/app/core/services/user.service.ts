import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
    private baseUrl: string = 'api/turism-app/user'

    constructor(
        private _http: Http
    ) { }

    public addUser(newUser: User) {
        // return this._http.post(`${this.baseUrl}/registration`, newUser)
        //     .map(res => {
        //         return res.json();
        //     });
        console.log(newUser)
    }

    public getUser(id: number): Observable<User> {
        return this._http.get(`${this.baseUrl}`, id)
            .map(res => {
                return res.json();
            });
    }

    public getAllUsers(): Observable<Array<User>> {
        return this._http.get(`${this.baseUrl}`)
            .map(res => {
                return res.json();
            });
    }

    public updateUser(user: User): Observable<User> {
        return this._http.post(`${this.baseUrl}`, user)
            .map(res => {
                return res.json();
            });
    }

    public deleteUser(id: number) {
        return this._http.delete(`${this.baseUrl}/${id}`);
    }
}