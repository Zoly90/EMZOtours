// core
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

// 3rd party
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal'
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SelectModule } from 'ng-select';

// custom components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpModalComponent } from './toolbar/signUpModal/signupModal.component';
import { LoginDropdownComponent } from './toolbar/loginDropdown/loginDropdown.component';
import { LogoutButtonComponent } from "./toolbar/logout-button/logout-button.component";
import { MyProfileDropdownComponent } from "./toolbar/my-profile-dropdown/my-profile-dropdown.component";
import { DateSelecComponent } from "./date-slect/date-select.component";
import { DeleteConfirmationModalComponent } from "./delete-confirmation-modal/delete-confirmation-modal.component";
import { ResetPasswordModalComponent } from "./toolbar/loginDropdown/reset-password-modal/reset-password-modal.component";
import { DisplayAddressComponent } from "./display-address/display-address.component";

// custom services
import { LoginDropdownService } from "./toolbar/loginDropdown/login-dropdown.service";
import { UserService } from "./services/user.service";
import { UserValidatorService } from "./services/user-validator.service";

// UI
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from "../utils/utils.service";
import { SearchInputComponent } from "./search-input/search-input.component";
import { SharedServices } from "./services/shared-services.service";
import { HolidayListElement } from "./holiday-list-element/holiday-list-element.component";
import { MatListModule } from "@angular/material/list";
import { SharingIconsComponent } from "./sharing-icons/sharing-icons.component";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    TranslateModule
  ],
  declarations: [
    ToolbarComponent,
    DateSelecComponent,
    SignUpModalComponent,
    LoginDropdownComponent,
    LogoutButtonComponent,
    MyProfileDropdownComponent,
    NavbarComponent,
    DeleteConfirmationModalComponent,
    ResetPasswordModalComponent,
    DisplayAddressComponent,
    SearchInputComponent,
    HolidayListElement,
    SharingIconsComponent
  ],
  exports: [
    DateSelecComponent,
    SignUpModalComponent,
    ToolbarComponent,
    NavbarComponent,
    DeleteConfirmationModalComponent,
    FormsModule,
    SelectModule,
    DisplayAddressComponent,
    SearchInputComponent,
    HolidayListElement,
    SharingIconsComponent
  ],
  providers: [
    UserService,
    UserValidatorService,
    LoginDropdownService,
    UtilsService,
    SharedServices
  ],
  entryComponents: [
    ResetPasswordModalComponent,
    SignUpModalComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
