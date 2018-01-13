export class PagedList<T> {
	offset: number
	itemsPerPage: number
	itemsTotal: number
	data: Array<any>
}