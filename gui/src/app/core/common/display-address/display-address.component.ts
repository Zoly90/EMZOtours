import {
	Component,
	Output,
	Input,
	EventEmitter
} from "@angular/core";
import { UserAddress } from "../../authentication/models/user-address.model";

@Component({
	selector: 'display-address',
	templateUrl: './display-address.component.html',
	styleUrls: ['./display-address.component.scss']
})

export class DisplayAddressComponent {

	@Input() address: UserAddress;

	@Output() onClick = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }

	public emitAction() {
		this.onClick.emit();
	}
}