import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SignUpModalComponent } from './signUpModal/signupModal.component';
import { LoginDropdownComponent } from './loginDropdown/loginDropdown.component';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'sd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Output() onLoginSuccessful = new EventEmitter();
    @Output() onLogout = new EventEmitter();

    @Input() userLogedIn: boolean;

    public loggingIn(logedIn: boolean) {
        this.onLoginSuccessful.emit(logedIn);
    }

    public loggingOut() {
        this.onLogout.emit()
    }
}

