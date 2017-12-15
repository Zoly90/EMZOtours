import { AbstractControl, FormGroup } from '@angular/forms';
import { TurismAppConstants } from "../../utils/constants";

export class AgeValidation {

	static ValidateAge(yearKey: string, monthKey: string, dayKey: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let yearInput = group.controls[yearKey];
			let monthInput = group.controls[monthKey];
			let dayInput = group.controls[dayKey];
			let year = yearInput.value;
			let month = monthInput.value;
			let day = dayInput.value;

			const todaysDate = new Date();
			const enteredDate = new Date(
				Number(year),
				Number(month),
				Number(day) + 1
			);

			// get time difference in miliseconds
			let timeDifference = Math.abs(todaysDate.getTime() - enteredDate.getTime());
			// convert it to number of years
			let differenceInYears = (timeDifference / (1000 * 3600 * 24)) * TurismAppConstants.DAY_TO_YEAR_CONVERSION;

			if (differenceInYears < 18) {
				return {
					notOver18: true
				};
			}
			return null;
		}
	}
}