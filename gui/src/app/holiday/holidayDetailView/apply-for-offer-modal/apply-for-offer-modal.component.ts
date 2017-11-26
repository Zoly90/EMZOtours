import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreditCard } from '../../../core/authentication/models/user-credit-card.model';
import { ApplyForOfferService } from '../../services/apply-for-offer.service';
import { ApplyForOffer } from '../../models/apply-for-offer.model';
import { UtilsService } from '../../../utils/utils.service';
import { LoginDropdownService } from "../../../shared/toolbar/loginDropdown/login-dropdown.service";
import { UserService } from "../../../shared/services/user.service";
import { SignUpModalComponent } from "../../../shared/toolbar/signUpModal/signupModal.component";

@Component({
  selector: 'apply-for-offer-modal',
  templateUrl: './apply-for-offer-modal.component.html',
  styleUrls: ['./apply-for-offer-modal.component.scss']
})
export class ApplyForOfferModalComponent {

  public signUpModalRef: BsModalRef;
  public applyForOfferForm: FormGroup;
  public userCreditCard: UserCreditCard = new UserCreditCard();
  private creditCardExpirationDate: any;

  /* variables in case a user is loged in */
  private modalTitle: string;
  private offerId: number;
  private userId: number;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private applyForOfferService: ApplyForOfferService,
    private loginDropdownService: LoginDropdownService,
    private utilsService: UtilsService,
    private userService: UserService
  ) {
    this.applyForOfferForm = this.formBuilder.group({
      creditCardNumber: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16)
        ])
      ],
      creditCardVerificationNumber: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3)
        ])
      ]
    })
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.userId) {
        this._populateFormWithExistingData()
      }
    }), 500
  }

  private _populateFormWithExistingData() {
    this.userService.getUserCreditCardData(this.userId)
      .subscribe(res => {
        this.userCreditCard = res;
        console.log(this.userCreditCard)
        this.creditCardExpirationDate = {
          year: this.userCreditCard.creditCardExpirationYear,
          month: this.userCreditCard.creditCardExpirationMonth
        }
        console.log(this.creditCardExpirationDate)
        this._initFormWithExistingUserData();
      })
  }

  public openDropdown($event: MouseEvent) {
    this.bsModalRef.hide();
    this.loginDropdownService.toggleDropdown($event);
  }

  public openSignUpModal() {
    this.bsModalRef.hide();
    this.signUpModalRef = this.modalService.show(SignUpModalComponent);
  }

  public onDateSelected(yearAndMonth) {
    this.userCreditCard.creditCardExpirationYear = yearAndMonth.selectedYear;
    this.userCreditCard.creditCardExpirationMonth = this.utilsService.convertToNumericalMonth(yearAndMonth.selectedMonth) + 1;
  }

  public applyForOffer(formValues) {
    const applyForOffer = new ApplyForOffer();
    applyForOffer.offerId = this.offerId;
    applyForOffer.userId = this.userId;
    applyForOffer.userCreditCardTO = this._getNewUserCreditCardInformation(formValues);
    this.applyForOfferService.applyForOffer(applyForOffer).toPromise()
      .then(res => this.bsModalRef.hide())
      .catch(err => console.log(err));
  }

  private _initFormWithExistingUserData() {
    this.applyForOfferForm.controls.creditCardNumber.setValue(this.utilsService.decode(this.userCreditCard.creditCardNumber));
  }

  private _getNewUserCreditCardInformation(formValues) {
    this.userCreditCard.creditCardNumber = this.utilsService.encode(formValues.creditCardNumber);
    this.userCreditCard.creditCardVerificationNumber = this.utilsService.encode(formValues.creditCardVerificationNumber);
    return this.userCreditCard;
  }
}