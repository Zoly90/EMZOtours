import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { UserRegistrationModel } from "../toolbar/signUpModal/model/registration-model";
import { SearchCriteria } from "../models/search-criteria.model";
import { SubmitReview } from "../../holiday/models/holiday.model";

@Injectable()
export class UserService {
    private baseUrl: string = 'api/turism-app/user';

    constructor(
        private _http: HttpClient
    ) { }

    public registerUser(newUser: UserRegistrationModel) {
        return this._http.post(`${this.baseUrl}/registration`, newUser,
        {
            responseType: 'text'
        });
    }

    public addOrUpdateUser(user: User, passwordChanged?: string) {
        return this._http.post(`${this.baseUrl}`, 
        {
            userInfo: user.userInfo,
            userLogin: user.userLogin,
            userCreditCard: user.userCreditCard,
            userIdentity: user.userIdentity,
            userAddress: user.userAddress
        },
        {
            params: {
                'passwordChanged': passwordChanged ? passwordChanged : ''
            }
        });
    }

    public getHolidaysOfLoggedInUser(userId: number) {
        return this._http.get(`${this.baseUrl}/${userId}/holidays`);
    }

    public saveReview(review: SubmitReview, userId: number, holidayId: number): Observable<any> {
        return this._http.post(`${this.baseUrl}/${userId}/${holidayId}/submit-review`, review);
    }

    public getHolidaysWishlistOfLoggedInUser(userId: number) {
        return this._http.get(`${this.baseUrl}/${userId}/holidays-wishlist`)
    }

    public getUser(id: number): Observable<any> {
        return this._http.get(`${this.baseUrl}/${id}`)
    }

    public getAllUsers(searchCriteria: SearchCriteria): Observable<any> {
        return this._http.post(`${this.baseUrl}/search`, searchCriteria);
    }

    public deleteUser(id: number) {
        return this._http.delete(`${this.baseUrl}/${id}`,
        {
            responseType: 'text'
        });
    }

    public getUserCreditCardData(id: number): Observable<any> {
        return this._http.get(`${this.baseUrl}/${id}/credit-card-data`);
    }

    public getAllStaff(): Observable<any> {
        return this._http.get(`${this.baseUrl}/all-employees`);
    }
}