import { Component, ViewChild, Input } from '@angular/core';
import * as Collections from 'typescript-collections';
import { User } from "../../models/user.model";
import { TurismAppConstants } from "../../../utils/constants";
import { UserService } from "../../services/user.service";
import { UserValidatorService } from "../../services/user-validator.service";
import { UtilsService } from "../../../utils/utils.service";
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";
import { UserAddress } from "../../../core/authentication/models/user-address.model";
import { UserIdentity } from "../../../core/authentication/models/user-identity.model";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordValidation } from "../../services/password-validation";
import { DateSelectModel } from "../../date-slect/model/date-select.model";
import { UserRegistrationModel } from "./model/registration-model";

@Component({
  selector: 'signup-modal',
  templateUrl: './signupModal.component.html',
  styleUrls: ['./signupModal.component.scss']
})
export class SignUpModalComponent {

  public regularSignUp: string;
  public updateMyProfile: string;
  public adminNewUser: string;
  public adminEditUser: number;
  public modificationsSavedSuccessfully: boolean = false;

  private userForm: FormGroup;
  private user: User = new User();
  private notSignedIn: boolean = false;
  private signedInAsAdmin: boolean = false;
  private signedInAsEmployee: boolean = false;
  private changePassword: boolean = false;
  private userAddressSectionNotRequired: boolean = false;
  private userPaymentMethodSectionRequired: boolean = true;
  private submitted = false;

  // Array for Title, construction happens in constructor
  private titles = TurismAppConstants.TITLES;

  // select date component action types
  private birthdate = TurismAppConstants.BIRTHDATE;
  private idCardExpirationDate = TurismAppConstants.ID_CARD_EXPIRATION_DATE;

  constructor(
    public signUpModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _utilsService: UtilsService,
    private _authorizationService: AuthorizationService
  ) {
    this.submitted = false;

    this.userForm = this._formBuilder.group({
      roleEmployee: [
        {
          value: false,
          disabled: false
        }
      ],
      roleAdmin: [
        {
          value: false,
          disabled: false
        }
      ],
      title: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      firstName: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ])
      ],
      lastName: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ])
      ],
      telephoneNumber: [
        {
          value: '',
          disabled: false
        },
        Validators.pattern(this._utilsService.getPhoneNumberRegex())
      ],
      emailAddress: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.pattern(this._utilsService.getEmailRegexPattern())
        ])
      ],
      username: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ],
      oldPassword: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      password: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this._utilsService.getPasswordReggex())
        ])
      ],
      confirmPassword: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      birthday: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      subsribeToNewsletter: [
        {
          value: false,
          disabled: false
        }
      ],
      country: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      city: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      street: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      streetNumber: [
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
      zipCode: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.pattern(this._utilsService.getOnlyNumbersRegex())
        ])
      ],
      personalIdentificationNumber: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.pattern(this._utilsService.getOnlyNumbersRegex()),
          Validators.maxLength(13),
          Validators.minLength(13)
        ])
      ],
      identityCardSeries: [
        {
          value: '',
          disabled: false
        },
        Validators.required
      ],
      identityCardNumber: [
        {
          value: '',
          disabled: false
        },
        Validators.compose([
          Validators.required,
          Validators.pattern(this._utilsService.getOnlyNumbersRegex())
        ])
      ],
      idCardExpirationDate: [
        {
          value: '',
          disabled: false
        }
      ],
      bankAccountNumber: [
        {
          value: '',
          disabled: false
        }
      ],
      creditCardNumber: [
        {
          value: '',
          disabled: true
        }
      ],
      creditCardName: [
        {
          value: '',
          disabled: true
        }
      ],
      creditCardExpirationDate: [
        {
          value: '',
          disabled: true
        }
      ],
      cash: [
        {
          value: false,
          disabled: false
        }
      ],
      creditCard: [
        {
          value: false,
          disabled: false
        }
      ],
      later: [
        {
          value: true,
          disabled: false
        }
      ]
    }, {
        validator: PasswordValidation.MatchPassword('password', 'confirmPassword')
      });
  }

  ngOnInit() {
    setTimeout(() => {
      const token = this._utilsService.checkAuthAndGetToken();
      if (token) {
        this._signedInUserIs(token.role);
        this._updateUserAddressSectionValidators();
        if (this.updateMyProfile) {
          console.log('updateMyProfile', token)
          this._userService.getUser(token.userID)
            .subscribe(userProfile => {
              console.log('from BE', userProfile)
              this.user = userProfile;
              this._fillFormWithUserData();
            });
          this._updatePasswordFieldsValidators();
        } else {
          this._updatePasswordFieldsValidators();
          this.userForm.controls['subsribeToNewsletter'].disable();
          this._disablePaymentCashAndCreditCardCheckbox(true);
          if (this.adminEditUser) {
            console.log('adminEditUser', this.adminEditUser)
            this._userService.getUser(this.adminEditUser).subscribe(userForEdit => {
              this.user = userForEdit;
              this._fillFormWithUserData();
            });
          } else {
            console.log('adminNewUser', this.adminNewUser)
            this.userForm.controls['roleAdmin'].valueChanges.subscribe(res => this._disableRoleEmployeeCheckbox(res));
            this.userForm.controls['roleEmployee'].valueChanges.subscribe(res => this._disableRoleAdminCheckbox(res));
          }
        }
      } else {
        console.log('regularSignUp', this.regularSignUp)
        this.notSignedIn = true;
        this._updateUserPaymentMethodSection();
        this._updateUserAddressSectionValidators();
        this._updateUserIdentitySectionValidators();
        this.userForm.controls['oldPassword'].clearValidators();
        this.userForm.controls['oldPassword'].updateValueAndValidity();
      }
    }, 100);

    this.userForm.controls['cash'].valueChanges.subscribe(res => this._disablePaymentCreditCardAndLaterCheckbox(res));

    this.userForm.controls['creditCard'].valueChanges.subscribe(res => this._disablePaymentCashAndLaterCheckbox(res));

    this.userForm.controls['later'].valueChanges.subscribe(res => this._disablePaymentCashAndCreditCardCheckbox(res));

    this.userForm.controls['subsribeToNewsletter'].valueChanges.subscribe(res => this.findInvalidControls());

    // this.customerForm.controls['customerNr'].valueChanges
    //   .debounceTime(1200)
    //   .distinctUntilChanged()
    //   .subscribe(term => {
    //     this._onCustNrChange(term);
    //   });
  }

  private findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(this.userForm)
    console.log(invalid);
  }

  public setSelectedDateInFormControl(selectedDate: DateSelectModel, formControlName: string) {
    this.userForm.controls[formControlName].setValue(this._utilsService.getDateFromDateSelectModel(selectedDate));
  }

  public activateChangePassword() {
    this.changePassword = !this.changePassword;
    this._updatePasswordFieldsValidators();
  }

  public saveData() {
    let userToSave;
    if (this.regularSignUp) {
      userToSave = this._getRegistrationModel(this.userForm.value);
      this._userService.registerUser(userToSave).subscribe(res => this.modificationsSavedSuccessfully = true);
    } else {
      userToSave = this._getUserModel(this.userForm.value);
      if (this.adminEditUser) {
        userToSave = this._getIdsForExistingUser(userToSave);
      }
      if (this.updateMyProfile && this.changePassword) {
        this._userService.addOrUpdateUser(userToSave, 'passwordChanged').subscribe(res => this.modificationsSavedSuccessfully = true);
      } else {
        this._userService.addOrUpdateUser(userToSave).subscribe(res => this.modificationsSavedSuccessfully = true);
      }
      console.log('userToSave', userToSave)
      this.submitted = true;
    }
  }

  private _getIdsForExistingUser(userToSave: User) {
    if (this.user.userInfo && this.user.userInfo.id) {
      userToSave.userInfo.id = this.user.userInfo.id;
    }

    if (this.user.userLogin && this.user.userLogin.id) {
      userToSave.userLogin.id = this.user.userLogin.id;
    }

    if (this.user.userAddress && this.user.userAddress.id) {
      userToSave.userAddress.id = this.user.userAddress.id;
    }

    if (this.user.userCreditCard && this.user.userCreditCard.id) {
      userToSave.userCreditCard.id = this.user.userCreditCard.id;
    }
    
    if (this.user.userIdentity && this.user.userIdentity.id) {
      userToSave.userIdentity.id = this.user.userIdentity.id;
    }

    return userToSave;
  }

  private _getRegistrationModel(formValues) {
    const userRegistration: UserRegistrationModel = new UserRegistrationModel();
    userRegistration.title = formValues.title;
    userRegistration.firstName = formValues.firstName;
    userRegistration.lastName = formValues.lastName;
    userRegistration.telephoneNr = formValues.telephoneNumber;
    userRegistration.newsletter = formValues.subsribeToNewsletter;
    userRegistration.birthday = formValues.birthday;
    userRegistration.emailAddress = formValues.emailAddress;
    userRegistration.username = formValues.username;
    userRegistration.password = formValues.password;
    userRegistration.passwordConfirm = formValues.confirmPassword;
    return userRegistration;
  }

  private _getUserModel(formValues) {
    const userToSave: User = new User();
    console.log(formValues)
    userToSave.userInfo.title = formValues.title;
    userToSave.userInfo.firstName = formValues.firstName;
    userToSave.userInfo.lastName = formValues.lastName;
    userToSave.userInfo.telephoneNr = formValues.telephoneNumber;
    userToSave.userInfo.newsletter = formValues.subsribeToNewsletter;
    userToSave.userInfo.birthday = formValues.birthday;
    userToSave.userLogin.emailAddress = formValues.emailAddress;
    userToSave.userLogin.username = formValues.username;
    if (this.updateMyProfile) {
      if (this.changePassword) {
        userToSave.userLogin.oldPassword = formValues.oldPassword;
        userToSave.userLogin.password = formValues.password;
        userToSave.userLogin.passwordConfirm = formValues.confirmPassword;
      }
      userToSave.userLogin.role = this.user.userLogin.role;
    }
    if (this.adminNewUser || this.adminEditUser) {
      if (this.userForm.controls['roleAdmin'].value) {
        userToSave.userLogin.role = TurismAppConstants.ADMIN;
      } else if (this.userForm.controls['roleEmployee'].value) {
        userToSave.userLogin.role = TurismAppConstants.EMPLOYEE;
      } else {
        userToSave.userLogin.role = TurismAppConstants.CLIENT;
      }
    }
    if (formValues.country) {
      userToSave.userAddress.country = formValues.country;
      userToSave.userAddress.city = formValues.city;
      userToSave.userAddress.street = formValues.street;
      userToSave.userAddress.streetNr = formValues.streetNumber;
      userToSave.userAddress.apartment = formValues.apartment;
      userToSave.userAddress.zip = formValues.zipCode;
    }
    if (formValues.personalIdentificationNumber) {
      userToSave.userIdentity.cnp = formValues.personalIdentificationNumber
      userToSave.userIdentity.identityCardSeries = formValues.identityCardSeries
      userToSave.userIdentity.identityCardNumber = formValues.identityCardNumber
      userToSave.userIdentity.idCardExpirationDate = formValues.idCardExpirationDate
      userToSave.userIdentity.iban = formValues.bankAccountNumber
    }
    if (formValues.later && formValues.creditCardNumber) {
      userToSave.userCreditCard.creditCardNumber = formValues.creditCardNumber;
      userToSave.userCreditCard.creditCardExpirationDate = formValues.creditCardExpirationDate;
      userToSave.userCreditCard.creditCardUserName = formValues.creditCardName;
    }
    return userToSave;
  }

  private _fillFormWithUserData() {
    console.log('existing user', this.user)
    if (this.adminNewUser || this.adminEditUser) {
      if (this.user.userLogin.role === TurismAppConstants.ADMIN) {
        console.log('admin')
        this.userForm.controls['roleAdmin'].setValue(true);
        this.userForm.controls['roleAdmin'].disable();
        this.userForm.controls['roleEmployee'].disable();
      } else if (this.user.userLogin.role === TurismAppConstants.EMPLOYEE) {
        console.log('employee')
        this.userForm.controls['roleEmployee'].setValue(true);
        this.userForm.controls['roleEmployee'].disable();
        this.userForm.controls['roleAdmin'].disable();
      } else {
        console.log('client')
        this.userForm.controls['roleEmployee'].disable();
        this.userForm.controls['roleAdmin'].disable();
      }
    }
    this.userForm.controls['title'].setValue(this.user.userInfo.title);
    this.userForm.controls['firstName'].setValue(this.user.userInfo.firstName);
    this.userForm.controls['lastName'].setValue(this.user.userInfo.lastName);
    this.userForm.controls['telephoneNumber'].setValue(this.user.userInfo.telephoneNr);
    this.userForm.controls['emailAddress'].setValue(this.user.userLogin.emailAddress);
    this.userForm.controls['username'].setValue(this.user.userLogin.username);
    this.userForm.controls['birthday'].setValue(this.user.userInfo.birthday);
    this.userForm.controls['subsribeToNewsletter'].setValue(this.user.userInfo.newsletter);
    if (this.user.userAddress != null) {
      this.userForm.controls['country'].setValue(this.user.userAddress.country);
      this.userForm.controls['city'].setValue(this.user.userAddress.city);
      this.userForm.controls['street'].setValue(this.user.userAddress.street);
      this.userForm.controls['streetNumber'].setValue(this.user.userAddress.streetNr);
      this.userForm.controls['apartment'].setValue(this.user.userAddress.apartment);
      this.userForm.controls['zipCode'].setValue(this.user.userAddress.zip);
    }
    if (this.user.userIdentity != null) {
      this.userForm.controls['personalIdentificationNumber'].setValue(this.user.userIdentity.cnp);
      this.userForm.controls['identityCardSeries'].setValue(this.user.userIdentity.identityCardSeries);
      this.userForm.controls['identityCardNumber'].setValue(this.user.userIdentity.identityCardNumber);
      this.userForm.controls['idCardExpirationDate'].setValue(this.user.userIdentity.idCardExpirationDate);
      this.userForm.controls['bankAccountNumber'].setValue(this.user.userIdentity.iban);
    }
    if (this.user.userCreditCard != null) {
      this.userForm.controls['creditCardNumber'].setValue(this.user.userCreditCard.creditCardNumber);
      this.userForm.controls['creditCardExpirationDate'].setValue(this.user.userCreditCard.creditCardExpirationDate);
      this.userForm.controls['creditCardName'].setValue(this.user.userCreditCard.creditCardUserName);
    }
  }

  private _updatePasswordFieldsValidators() {
    if (!this.changePassword) {
      this.userForm.controls['oldPassword'].clearValidators();
      this.userForm.controls['oldPassword'].updateValueAndValidity();
      this.userForm.controls['password'].clearValidators();
      this.userForm.controls['password'].updateValueAndValidity();
      this.userForm.controls['confirmPassword'].clearValidators();
      this.userForm.controls['confirmPassword'].updateValueAndValidity();
    } else {
      this.userForm.controls['oldPassword'].setValidators(Validators.required);
      this.userForm.controls['password'].setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this._utilsService.getPasswordReggex())
      ]));
      this.userForm.controls['confirmPassword'].setValidators(Validators.required);
    }
  }

  private _updateUserIdentitySectionValidators() {
    this.userForm.controls['personalIdentificationNumber'].clearValidators();
    this.userForm.controls['personalIdentificationNumber'].updateValueAndValidity();
    this.userForm.controls['identityCardSeries'].clearValidators();
    this.userForm.controls['identityCardSeries'].updateValueAndValidity();
    this.userForm.controls['identityCardNumber'].clearValidators();
    this.userForm.controls['identityCardNumber'].updateValueAndValidity();
    this.userForm.controls['idCardExpirationDate'].clearValidators();
    this.userForm.controls['idCardExpirationDate'].updateValueAndValidity();
    this.userForm.controls['bankAccountNumber'].clearValidators();
    this.userForm.controls['bankAccountNumber'].updateValueAndValidity();
  }

  private _updateUserAddressSectionValidators() {
    if (this.regularSignUp || (this.updateMyProfile && (!this.signedInAsEmployee && !this.signedInAsAdmin)) || ((this.adminNewUser || this.adminEditUser) && (!this.userForm.controls['roleAdmin'].value && !this.userForm.controls['roleEmployee'].value))) {
      this.userAddressSectionNotRequired = true;
      this.userForm.controls['country'].clearValidators();
      this.userForm.controls['country'].updateValueAndValidity();
      this.userForm.controls['city'].clearValidators();
      this.userForm.controls['city'].updateValueAndValidity();
      this.userForm.controls['street'].clearValidators();
      this.userForm.controls['street'].updateValueAndValidity();
      this.userForm.controls['zipCode'].clearValidators();
      this.userForm.controls['zipCode'].updateValueAndValidity();
    } else {
      this.userAddressSectionNotRequired = false;
      this.userForm.controls['country'].setValidators(Validators.required);
      this.userForm.controls['city'].setValidators(Validators.required);
      this.userForm.controls['street'].setValidators(Validators.required);
      this.userForm.controls['zipCode'].setValidators(Validators.compose([
        Validators.required,
        Validators.pattern(this._utilsService.getOnlyNumbersRegex())
      ]));
    }
  }

  private _updateUserPaymentMethodSection() {
    if (this.userForm.controls['roleAdmin'].value || this.userForm.controls['roleEmployee'].value || this.regularSignUp) {
      this.userPaymentMethodSectionRequired = false;
    } else {
      this.userPaymentMethodSectionRequired = true;
    }
  }

  private _signedInUserIs(role) {
    if (role === TurismAppConstants.ADMIN) {
      this.signedInAsAdmin = true;
    } else if (role === TurismAppConstants.EMPLOYEE) {
      this.signedInAsEmployee = true;
    }
  }

  private _resetForm() {
    this.submitted = false;
    this.user = new User();
    this.userForm.reset();
  }

  private _disableRoleAdminCheckbox(newValue) {
    if (newValue) {
      this.userForm.controls['roleAdmin'].disable();
    } else if (this.userForm.controls['roleAdmin'].disabled) {
      this.userForm.controls['roleAdmin'].enable();
    }
    this._updateUserAddressSectionValidators();
    this._updateUserPaymentMethodSection();
  }

  private _disableRoleEmployeeCheckbox(newValue) {
    if (newValue) {
      this.userForm.controls['roleEmployee'].disable();
    } else if (this.userForm.controls['roleEmployee'].disabled) {
      this.userForm.controls['roleEmployee'].enable();
    }
    this._updateUserAddressSectionValidators();
    this._updateUserPaymentMethodSection();
  }

  private _disablePaymentCashAndLaterCheckbox(newValue) {
    if (newValue) {
      this.userForm.controls['cash'].disable();
      this.userForm.controls['later'].disable();
    } else if (this.userForm.controls['cash'].disabled && this.userForm.controls['later'].disabled) {
      this.userForm.controls['cash'].enable();
      this.userForm.controls['later'].enable();
    }
    this._updateCreditCardDataFields();
  }
  private _disablePaymentCashAndCreditCardCheckbox(newValue) {
    if (newValue) {
      this.userForm.controls['cash'].disable();
      this.userForm.controls['creditCard'].disable();
    } else if (this.userForm.controls['cash'].disabled && this.userForm.controls['creditCard'].disabled) {
      this.userForm.controls['cash'].enable();
      this.userForm.controls['creditCard'].enable();
    }
    this._updateCreditCardDataFields();
  }
  private _disablePaymentCreditCardAndLaterCheckbox(newValue) {
    if (newValue) {
      this.userForm.controls['creditCard'].disable();
      this.userForm.controls['later'].disable();
    } else if (this.userForm.controls['creditCard'].disabled && this.userForm.controls['later'].disabled) {
      this.userForm.controls['creditCard'].enable();
      this.userForm.controls['later'].enable();
    }
    this._updateCreditCardDataFields();
  }

  private _updateCreditCardDataFields() {
    if (this.userForm.controls['later'].value) {
      this.userForm.controls['creditCardNumber'].enable();
      this.userForm.controls['creditCardName'].enable();
      this.userForm.controls['creditCardExpirationDate'].enable();
    } else {
      this.userForm.controls['creditCardNumber'].disable();
      this.userForm.controls['creditCardName'].disable();
      this.userForm.controls['creditCardExpirationDate'].disable();
    }
  }
}
