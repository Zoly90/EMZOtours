import { Component } from '@angular/core';

import { SignUpModalComponent } from './signUpModal/signupModal.component';
import { LoginDropdownComponent } from './loginDropdown/loginDropdown.component';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  entryComponents: [SignUpModalComponent, LoginDropdownComponent]
})
export class ToolbarComponent {

    private userLogedIn: boolean = false;

    private check(logedIn: boolean) {
        if (logedIn) {
            this.userLogedIn = !this.userLogedIn;
        }
    }
}

