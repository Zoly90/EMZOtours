export class SearchCriteria {
		searchKeyword: string
    paginationCriteria: PaginationCriteria;

		constructor(searchKeyword?: string, paginationCriteria?: PaginationCriteria) {
			this.searchKeyword = searchKeyword ? searchKeyword : '';
			this.paginationCriteria = paginationCriteria ? paginationCriteria : null;
		}
}

export class PaginationCriteria {
    pageNumber: number;
    pageNumberOfItems: number;

    constructor( pageNumber = 0, pageNumberOfItems = 20 ) {
        this.pageNumber = pageNumber;
        this.pageNumberOfItems = pageNumberOfItems;
    }
}

export class FilterCriteria {
    field: string;
    operation: string;
    value: string;

    constructor( field, value, operation = 'contains' ) {
        this.field = field;
        this.value = value;
        this.operation = operation;
    }
}

export class SortCriteria {
    field: string;
    direction: string;

    constructor( field = '', direction = 'ASC') {
        this.field = field;
        this.direction = direction;
    }
}