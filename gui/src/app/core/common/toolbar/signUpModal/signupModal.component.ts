import { Component, ViewChild, Input } from '@angular/core';
import * as Collections from 'typescript-collections';
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";
import { TurismAppConstants } from "../../../../utils/constants";
import { UtilsService } from "../../../../utils/utils.service";
import { UserValidatorService } from "../../../services/user-validator.service";
import { AuthorizationService } from "../../../authentication/services/authorization.service";
import { UserAddress } from "../../../authentication/models/user-address.model";
import { UserIdentity } from "../../../authentication/models/user-identity.model";

@Component({
  selector: 'sd-signup',
  templateUrl: './signupModal.component.html',
  styleUrls: ['./signupModal.component.scss']
})
export class SignUpModalComponent {

  @ViewChild('signUpForm') signUpForm;

  @Input() existingUser: User;
  @Input() modalButtonFor: string;

  private signedInAsAdmin: boolean = false;
  private signUpButtonText: string;
  private width: string;

  private submitted = false;
  private user: User = new User();
  private selectedBirthdate: { selectedYear: '', selectedMonth: '', selectedDay: '', notOver18: false };
  private selectedIdCardExpirationDate: { selectedYear: '', selectedMonth: '', selectedDay: '' };

  private validEmailAddress: boolean = false;
  private inValidEmailAddressMessage: string = '';
  private validUsernameLength: boolean = false;
  private inValidUsernameLengthMessage: string = '';
  private validPasswordLength: boolean = false;
  private inValidPasswordLengthMessage: string = '';
  private passwordNotEqual: boolean = true;
  private passwordNotEqualMessage: string = '';
  private validTelephoneNumber: boolean = false;
  private invalidTelephoneNumberMessage: string = '';

  // Array for Title, construction happens in constructor
  private titlesArray = TurismAppConstants.TITLES;
  private titles: Array<any> = [];
  private selectedTitle = '';

  // admin & employee checkboxes
  private adminChecked: boolean = false;
  private employeeChecked: boolean = false;

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    private userValidatorService: UserValidatorService,
    private authorizationService: AuthorizationService
  ) {
    this.submitted = false;

    for (let i = 0; i < this.titlesArray.length; i++) {
      this.titles[i] = {
        value: i.toString(),
        label: this.titlesArray[i]
      }
    }
  }

  ngOnInit() {
    let token = this.authorizationService.getDecodedToken();
    if (token != null && token.role === TurismAppConstants.ADMIN) {
      if (this.modalButtonFor === 'admin-new') {
        this.signUpButtonText = 'Add a new user';
      } else if (this.modalButtonFor === 'admin-edit') {
        this.signUpButtonText = 'Edit';
      } else if (this.modalButtonFor === 'view') {
        this.signUpButtonText = 'Personal information';
        // this.userService.getUser(token.id)
        //   .subscribe(user => this.user = user);
      }
      this.signedInAsAdmin = true;
      this.width = '368px';

      if (this.existingUser) {
        this.user = this.existingUser;

        if (this.existingUser.userAddress == null) {
          this.user.userAddress = new UserAddress();
        }
        if (this.existingUser.userIdentity == null) {
          this.user.userIdentity = new UserIdentity();
        }
      }
    } else if (token != null && this.modalButtonFor === 'view') {
      this.signUpButtonText = 'Personal information';
      // this.userService.getUser(token.id)
      //   .subscribe(user => this.user = user);
    } else {
      this.signUpButtonText = ' Sign up';
      this.signedInAsAdmin = false;
      this.width = '100%';
    }
  }

  public validateEmailAddress() {
    if (this.user.userLogin.emailAddress && this.user.userLogin.emailAddress != '') {
      this.validEmailAddress = this.userValidatorService.validateEmailAddress(this.user.userLogin);
      if (!this.validEmailAddress) {
        this.inValidEmailAddressMessage = TurismAppConstants.INVALID_EMAIL_ADDRESS_MESSAGE;
      } else {
        this.inValidEmailAddressMessage = '';
      }
    }
  }

  public validateUsernameLength() {
    if (this.user.userLogin.username && this.user.userLogin.username != '') {
      this.validUsernameLength = this.userValidatorService.validateUsernameLength(this.user.userLogin);
      if (!this.validUsernameLength) {
        this.inValidUsernameLengthMessage = TurismAppConstants.INVALID_USERNAME_LENGTH_MESSAGE;
      } else {
        this.inValidUsernameLengthMessage = '';
      }
    }
  }

  public validatePasswordLength() {
    if (this.user.userLogin.password && this.user.userLogin.password != '') {
      this.validPasswordLength = this.userValidatorService.validatePasswordLength(this.user.userLogin);
      if (!this.validPasswordLength) {
        this.inValidPasswordLengthMessage = TurismAppConstants.INVALID_PASWORD_LENGTH_MESSAGE;
      } else {
        this.inValidPasswordLengthMessage = '';
      }
    }

    this.validatePasswordEquality();
  }

  public validatePasswordEquality() {
    if (this.user.userLogin.passwordConfirm && this.user.userLogin.passwordConfirm != '') {
      this.passwordNotEqual = this.userValidatorService.validatePasswordEquality(this.user.userLogin);
      if (this.passwordNotEqual) {
        this.passwordNotEqualMessage = TurismAppConstants.PASSWORD_NOT_EQUAL_MESSAGE;
      } else {
        this.passwordNotEqualMessage = '';
      }
    }
  }

  public validateTelephoneNumber() {
    if (this.user.telephoneNr && this.user.telephoneNr != '') {
      this.validTelephoneNumber = this.userValidatorService.validatePasswordEquality(this.user);
      if (this.validTelephoneNumber) {
        this.invalidTelephoneNumberMessage = TurismAppConstants.INVALID_TELEPHONE_NUMBER_MESSAGE;
      } else {
        this.invalidTelephoneNumberMessage = '';
      }
    }
  }

  public setRoleAsEmployee(event) {
    if (event) {
      this.user.userLogin.role = TurismAppConstants.EMPLOYEE;
    } else {
      this.user.userLogin.role = TurismAppConstants.CLIENT;
    }
  }

  public setRoleAsAdmin(event) {
    if (event) {
      this.user.userLogin.role = TurismAppConstants.ADMIN;
    } else {
      this.user.userLogin.role = TurismAppConstants.CLIENT;
    }
  }

  public onTitleSelected(item) {
    this.selectedTitle = item.label;
  }

  public setSelectedBirthdate(date) {
    this.selectedBirthdate = date;
  }

  public setSelectedIdCardExpirationDate(date) {
    this.selectedIdCardExpirationDate = date;
  }

  private onSubmit() {
    this.submitted = true;
  }

  public saveData() {
    if (this.signUpForm.form.valid &&
      (this.validEmailAddress && !this.selectedBirthdate.notOver18 && this.validUsernameLength && this.validPasswordLength && !this.passwordNotEqual)) {
      this.user.title = this.selectedTitle;

      this.selectedBirthdate.selectedMonth = this.utilsService.convertToNumericalMonth(this.selectedBirthdate.selectedMonth);
      this.user.birthday = new Date(Number(this.selectedBirthdate.selectedYear), Number(this.selectedBirthdate.selectedMonth), Number(this.selectedBirthdate.selectedDay));

      this.selectedIdCardExpirationDate.selectedMonth = this.utilsService.convertToNumericalMonth(this.selectedBirthdate.selectedMonth);
      this.user.userIdentity.idCardExpirationDate = new Date(Number(this.selectedIdCardExpirationDate.selectedYear), Number(this.selectedIdCardExpirationDate.selectedMonth), Number(this.selectedIdCardExpirationDate.selectedDay));

      /*  When the application reaches a final phase, if an admin tries to create a new user, the password should be generated automatically,
      and at first log in the USER should be forced to change his/her password.
      if (this.signedInAsAdmin) {
        this.user.userLoginTO.password = this.utilsService.generateString();
        this.user.userLoginTO.password = this.utilsService.encode(this.user.userLoginTO.password);
        this.user.userLoginTO.passwordConfirm = this.user.userLoginTO.password;
      } else {
        this.user.userLoginTO.password = this.utilsService.encode(this.user.userLoginTO.password);
        this.user.userLoginTO.passwordConfirm = this.utilsService.encode(this.user.userLoginTO.passwordConfirm);
      }
      */

      this.user.userLogin.password = this.utilsService.encode(this.user.userLogin.password);
      this.user.userLogin.passwordConfirm = this.utilsService.encode(this.user.userLogin.passwordConfirm);
      this.user.userIdentity.cnp = this.utilsService.encode(this.user.userIdentity.cnp);
      this.user.userIdentity.identityCardSeries = this.utilsService.encode(this.user.userIdentity.identityCardSeries);
      this.user.userIdentity.identityCardNumber = this.utilsService.encode(this.user.userIdentity.identityCardNumber);
      this.user.userIdentity.iban = this.utilsService.encode(this.user.userIdentity.iban);

      this.userService.addUser(this.user);
      this.onSubmit();
    }
  }

  private resetForm() {
    this.submitted = false;
    this.user = new User();
    this.validEmailAddress = false;
    this.inValidEmailAddressMessage = '';
    this.validUsernameLength = false;
    this.inValidUsernameLengthMessage = '';
    this.validPasswordLength = false;
    this.inValidPasswordLengthMessage = '';
    this.passwordNotEqual = true;
    this.passwordNotEqualMessage = '';
  }
}
