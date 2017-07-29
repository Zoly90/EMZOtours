import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
	selector: 'delete-confirmation-modal',
	templateUrl: './delete-confirmation-modal.component.html',
	styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {

	@Input() whatToDelete: string;
	@Input() toDelete: any;
	@Input() disabled: boolean;

	@Output() deleteConfirmation: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }

	public confirmDelete() {
		this.deleteConfirmation.emit(true);
	}
}