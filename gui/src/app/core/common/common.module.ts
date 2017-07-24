import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal'
import { AccordionModule } from 'ng2-bootstrap/accordion'
import { MaterialModule } from '@angular/material';
import { SelectModule } from 'angular2-select';
import { BackgroundImageComponent } from './backgroundImage/backgroundImage.component';
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
    MaterialModule,
    SelectModule,
    FlexLayoutModule
  ],
  declarations: [
    BackgroundImageComponent,
    ToolbarComponent,
    DateSelecComponent,
    SignUpModalComponent,
    LoginDropdownComponent,
    LogoutButtonComponent,
    MyProfileDropdownComponent,
    NavbarComponent
  ],
  exports: [
    DateSelecComponent,
    SignUpModalComponent,
    ToolbarComponent,
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    SelectModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    HttpClientTokenService,
    ErrorHandlingService,
    AuthorizationService,
    UserValidatorService,
    UtilsService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
