import { Component, Input, SimpleChanges } from "@angular/core";

@Component({
	selector: 'sharing-icons',
	templateUrl: './sharing-icons.component.html',
	styleUrls: ['./sharing-icons.component.scss'],
})

export class SharingIconsComponent {

	@Input() usedFor: string;

}