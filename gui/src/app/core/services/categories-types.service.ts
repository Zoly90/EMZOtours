import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CategoriesAndTypes } from "../models/categories-types.model";
import { Category } from "../models/category.model";
import { Types } from "../models/types.model";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { sortById } from "../utils";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class CategoriesAndTypesService {
    private baseUrl: string = 'api/turism-app'

    private categoriesAndTypes: CategoriesAndTypes;
    private _categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);
    private _types: BehaviorSubject<Types[]> = new BehaviorSubject([]);


    constructor(
        private _http: HttpClient
    ) { }

    private getCategoriesAndTypesHTTP(): Observable<CategoriesAndTypes> {
        return this._http.get(`${this.baseUrl}/home-page`)
            .map(res => res);
    }

    public setCategoriesAndTypes() {
        if (!this.categoriesAndTypes) {
            this.getCategoriesAndTypesHTTP().subscribe(data => {
                this.categoriesAndTypes = data;
                this._categories.next([...data.holidayMainCategoriesList]);
                this._types.next([...data.holidayTypesList]);
            });
        }
    }

    get $types() {
        return this._types
            .asObservable()
            .map(sortById);
    }

    get $categories() {
        return this._categories
            .asObservable()
            .map(sortById)
            .map(this._constructCategoriesToSend)
    }

    private _constructCategoriesToSend(categories: Category[]): Category[] {
        return categories.map(category => ({ ...new Category(), ...category }))
    }
}