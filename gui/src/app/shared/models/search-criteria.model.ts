export class SearchCriteria {
    searchKeyword: string
    paginationCriteria: PaginationCriteria;
    filterCriteria: Array<FilterCriteria>

    constructor(searchKeyword?: string, paginationCriteria?: PaginationCriteria, filterCriteria?: Array<FilterCriteria>) {
        this.searchKeyword = searchKeyword ? searchKeyword : '';
        this.paginationCriteria = paginationCriteria ? paginationCriteria : new PaginationCriteria();
        this.filterCriteria = filterCriteria ? filterCriteria : null;
    }
}

export class PaginationCriteria {
    offset: number;
    itemsPerPage: number;

    constructor(offset = 0, itemsPerPage = 10) {
        this.offset = offset;
        this.itemsPerPage = itemsPerPage;
    }
}

export class FilterCriteria {
    field: string;
    operation: string;
    value: string;

    constructor(field, value, operation = 'contains') {
        this.field = field;
        this.value = value;
        this.operation = operation;
    }
}

export const FilterFiledsName = new Map<string, string>([
    ['status', 'status'],
    ['openedStatusFilter', 'status.open'],
    ['wipStatusFilter', 'status.wip'],
    ['doneStatusFilter', 'status.done'],
    ['handledByFilter', 'userInfo'],
    ['destinationFilter', 'travelDestination']
]);

export class SortCriteria {
    field: string;
    direction: string;

    constructor(field = '', direction = 'ASC') {
        this.field = field;
        this.direction = direction;
    }
}