import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal'
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SelectModule } from 'ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpModalComponent } from './toolbar/signUpModal/signupModal.component';
import { LoginDropdownComponent } from './toolbar/loginDropdown/loginDropdown.component';
import { LogoutButtonComponent } from "./toolbar/logout-button/logout-button.component";
import { MyProfileDropdownComponent } from "./toolbar/my-profile-dropdown/my-profile-dropdown.component";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../authentication/services/authentication.service";
import { HttpClientTokenService } from "../authentication/services/http-client.service";
import { ErrorHandlingService } from "../authentication/services/error-handling.service";
import { AuthorizationService } from "../authentication/services/authorization.service";
import { UserValidatorService } from "../services/user-validator.service";
import { UtilsService } from "../../utils/utils.service";
import { DateSelecComponent } from "./date-slect/date-select.component";
import { DeleteConfirmationModalComponent } from "./delete-confirmation-modal/delete-confirmation-modal.component";
import { LoginDropdownService } from "./toolbar/loginDropdown/login-dropdown.service";
import { ResetPasswordModalComponent } from "./toolbar/loginDropdown/reset-password-modal/reset-password-modal.component";
import { DisplayAddressComponent } from "./display-address/display-address.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { RoutingByIDService } from "../services/routing-by-id.service";

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
    DisplayAddressComponent
  ],
  exports: [
    DateSelecComponent,
    SignUpModalComponent,
    ToolbarComponent,
    NavbarComponent,
    DeleteConfirmationModalComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    SelectModule,
    DisplayAddressComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    HttpClientTokenService,
    ErrorHandlingService,
    AuthorizationService,
    UserValidatorService,
    UtilsService,
    LoginDropdownService,
    RoutingByIDService
  ],
  entryComponents: [
    ResetPasswordModalComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
