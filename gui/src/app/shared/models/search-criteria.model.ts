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

export enum FilterFileds {
    status,
    openedStatusFilter,
    wipStatusFilter,
    doneStatusFilter,
    handledByFilter,
    destinationFilter,
    transportation,
    airplaneTransportationFilter,
    busTransportationFilter,
    personalTransportationFilter,
    destinationCountryFilter,
    destinationCityFilter,
    holidayTypeFilter,
    holidaySubcategoryFilter,
    beginDateFilter,
    endDateFilter,
    numberOfPeopleFilter,
    numberOfDaysFilter
}

export const FilterFiledsName = new Map<string, string>([
    [String(FilterFileds.status), 'status'],
    [String(FilterFileds.openedStatusFilter), 'status.open'],
    [String(FilterFileds.wipStatusFilter), 'status.wip'],
    [String(FilterFileds.doneStatusFilter), 'status.done'],
    [String(FilterFileds.handledByFilter), 'userInfo'],
    [String(FilterFileds.destinationFilter), 'travelDestination'],
    [String(FilterFileds.transportation), 'transportation'],
    [String(FilterFileds.airplaneTransportationFilter), 'transportation.airplane'],
    [String(FilterFileds.busTransportationFilter), 'transportation.bus'],
    [String(FilterFileds.personalTransportationFilter), 'transportation.personal'],
    [String(FilterFileds.destinationCountryFilter), 'country'],
    [String(FilterFileds.destinationCityFilter), 'city'],
    [String(FilterFileds.holidayTypeFilter), 'holidayTypes'],
    [String(FilterFileds.holidaySubcategoryFilter), 'holidaySubcategories'],
    [String(FilterFileds.beginDateFilter), 'departureDatesFrom'],
    [String(FilterFileds.endDateFilter), 'departureDatesUntil'],
    [String(FilterFileds.numberOfPeopleFilter), 'nrPeople'],
    [String(FilterFileds.numberOfDaysFilter), 'nrNights']
]);

export class SortCriteria {
    field: string;
    direction: string;

    constructor(field = '', direction = 'ASC') {
        this.field = field;
        this.direction = direction;
    }
}