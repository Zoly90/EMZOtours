import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SignUpModalComponent } from './signUpModal/signupModal.component';
import { LoginDropdownComponent } from './loginDropdown/loginDropdown.component';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { TurismAppConstants } from "../../utils/constants";

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

    public signUpModalRef: BsModalRef;

    private signUpModalAction = TurismAppConstants.REGULAR_SIGN_UP;

    constructor(
        private _modalService: BsModalService
    ) { }

    public openSignUpModal() {
        this.signUpModalRef = this._modalService.show(SignUpModalComponent, { class: 'modal-lg' });
        this.signUpModalRef.content.regularSignUp = this.signUpModalAction;
    }

    public loggingIn(logedIn: boolean) {
        this.onLoginSuccessful.emit(logedIn);
    }

    public loggingOut() {
        this.onLogout.emit()
    }

    public searchForHoliday(searchKeyWord: string) {
        console.log('searchKeyWord', searchKeyWord)
    }
}

