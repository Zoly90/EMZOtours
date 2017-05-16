export class Category {
    id?: number
    mainCategory?: string
    imageSrc?: string
    imageOpacity: boolean = false
    subcategoriesHidden: boolean = true
    toggleFading: boolean = false
    visibility: string = 'hidden'
    holidaySubcategories?: [{
        id?: number
        subcategory?: string
    }]

    constructor() {
        Object.assign(this, {
            holidaySubcategories: {}
        })
    }
}