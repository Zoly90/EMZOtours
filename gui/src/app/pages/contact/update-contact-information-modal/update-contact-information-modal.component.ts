import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ContactInformation } from "../contact.model.ts/contact.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContactService } from "../service/contact.service";
import { UtilsService } from "../../../utils/utils.service";

@Component({
	selector: 'update-contact-information-modal',
	templateUrl: './update-contact-information-modal.component.html',
	styleUrls: ['./update-contact-information-modal.component.scss']
})
export class UpdateContactInformationModal {

	private contactInformation: ContactInformation;
	private contactInformationForm: FormGroup;
	private contactInformationChanged: boolean;

	constructor(
		private _bsModalRef: BsModalRef,
		private _formBuilder: FormBuilder,
		private _contactService: ContactService,
		private _utilsService: UtilsService
	) {
		this.contactInformationForm = this._formBuilder.group({
			bookingEmail: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getEmailRegexPattern())
				])
			],
			inquiriesEmail: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getEmailRegexPattern())
				])
			],
			bookingTelephoneNr: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getOnlyNumbersRegex())
				])
			],
			inquiriesTelephoneNr: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getOnlyNumbersRegex())
				])
			],
			fax: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getOnlyNumbersRegex())
				])
			],
			weekdays: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			saturday: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			sunday: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			latitude: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getRealNumberReggexPattern())
				])
			],
			longitude: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
					Validators.pattern(this._utilsService.getRealNumberReggexPattern())
				])
			],
			city: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			street: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			streetNr: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required,
				])
			],
			block: [
				{
					value: '',
					disabled: false
				}
			],
			apartment: [
				{
					value: '',
					disabled: false
				}
			],
			zip: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.pattern(this._utilsService.getOnlyNumbersRegex()),
				])
			],
			additionalExplanation: [
				{
					value: '',
					disabled: false
				}
			]
		})
	}

	ngOnInit() {
		setTimeout(() => {
      this._populateFormWithExistingData();
    }, 500);
	}

	public closeModal() {
		this._bsModalRef.hide();
	}

	public checkChanges(field: string) {
		if (this.contactInformation != null && this.contactInformationForm.controls[field].dirty) {
			this.contactInformationChanged = true;
		}
	}

	public updateContactInformation() {
		const dataIds = this._getDataIds();
		const newContactInformation = new ContactInformation(this.contactInformationForm.value, dataIds);
		this._contactService.updateContactInformation(newContactInformation)
			.subscribe(res => this.contactInformation = res);
		this._bsModalRef.hide();
	}

	private _getDataIds() {
		const ids = {
			contactId: this.contactInformation.id,
			addressId: this.contactInformation.address.id
		}
		return ids;
	}

	private _populateFormWithExistingData() {
		this.contactInformationForm.controls.bookingEmail.setValue(this.contactInformation.bookingEmail);
		this.contactInformationForm.controls.inquiriesEmail.setValue(this.contactInformation.inquiriesEmail);
		this.contactInformationForm.controls.bookingTelephoneNr.setValue(this.contactInformation.bookingTelephoneNr);
		this.contactInformationForm.controls.inquiriesTelephoneNr.setValue(this.contactInformation.inquiriesTelephoneNr);
		this.contactInformationForm.controls.fax.setValue(this.contactInformation.fax);
		this.contactInformationForm.controls.weekdays.setValue(this.contactInformation.workingHours[0]);
		this.contactInformationForm.controls.saturday.setValue(this.contactInformation.workingHours[1]);
		this.contactInformationForm.controls.sunday.setValue(this.contactInformation.workingHours[2]);
		this.contactInformationForm.controls.latitude.setValue(this.contactInformation.latitude);
		this.contactInformationForm.controls.longitude.setValue(this.contactInformation.longitude);
		this.contactInformationForm.controls.city.setValue(this.contactInformation.address.city);
		this.contactInformationForm.controls.street.setValue(this.contactInformation.address.street);
		this.contactInformationForm.controls.streetNr.setValue(this.contactInformation.address.streetNr);
		this.contactInformationForm.controls.block.setValue(this.contactInformation.address.block);
		this.contactInformationForm.controls.apartment.setValue(this.contactInformation.address.apartment);
		this.contactInformationForm.controls.zip.setValue(this.contactInformation.address.zip);
		this.contactInformationForm.controls.additionalExplanation.setValue(this.contactInformation.address.additionalExplanation);
	}
}