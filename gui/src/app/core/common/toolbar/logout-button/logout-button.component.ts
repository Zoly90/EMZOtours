import { Component, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from "../../../authentication/services/authorization.service";

@Component({
    selector: 'logout-button',
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

    @Output() onLogout = new EventEmitter();

    constructor(
        private authorizationService: AuthorizationService
    ) { }

    private logout() {
        this.authorizationService.clearCredentials();
        this.onLogout.emit();
    }
}