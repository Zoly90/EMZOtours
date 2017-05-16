import { Category } from "./category.model";
import { Types } from "./types.model";

export class CategoriesAndTypes {
    holidayMainCategoriesList?: Category[]
    holidayTypesList?: Types[]

    constructor() {
        Object.assign(this, {})
    }
}