import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: 'search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

	@Input() searchFor: string;

	@Output() onSearch: EventEmitter<string> = new EventEmitter();

	private searchForm: FormGroup;

	constructor(
		private _formBuilder: FormBuilder
	) {
		this.searchForm = this._formBuilder.group({
			searchKeyWord: [
				{
					value: '',
					disabled: false
				}
			]
		});
	}

	ngOnInit() {
		this.searchForm.controls['searchKeyWord'].valueChanges.subscribe(res => {
			if (!res) {
				this.search(res);
			}
		})
	}

	public search(formValue) {
		this.onSearch.emit(this.searchForm.controls['searchKeyWord'].value);
	}
}