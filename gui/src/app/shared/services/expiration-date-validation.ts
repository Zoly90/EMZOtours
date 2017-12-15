import { AbstractControl, FormGroup } from '@angular/forms';
import { TurismAppConstants } from "../../utils/constants";

export class ExpirationDateValidation {

	static ValidateExpirationDate(yearKey: string, monthKey: string, dayKey?: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let yearInput = group.controls[yearKey];
			let monthInput = group.controls[monthKey];
			let year = yearInput.value;
			let month = monthInput.value;

			let dayInput;
			let day;
			if (dayKey) {
				dayInput = group.controls[dayKey];
				day = dayInput.value;
			} else {
				day = 0;
			}

			const todaysDate = new Date();
			const enteredDate = new Date(
				Number(year),
				Number(month),
				Number(day) + 1
			);

			if (enteredDate < todaysDate) {
				return {
					cardExpired: true
				};
			} else {
				return null;
			}
		}
	}
}