import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from 'lodash'
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";
import { TurismAppConstants } from "../../../utils/constants";
import { UserService } from "../../../shared/services/user.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SignUpModalComponent } from "../../../shared/toolbar/signUpModal/signupModal.component";
import { UtilsService } from "../../../utils/utils.service";
import { UserTableDataModel } from "./model/user-table-data.model";
import { SearchCriteria } from "../../../shared/models/search-criteria.model";

@Component({
	selector: 'user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

	private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';
	private listOfUsers: Array<UserTableDataModel> = new Array<UserTableDataModel>();
	private searchCriteria: SearchCriteria = new SearchCriteria();

	public signUpModalRef: BsModalRef;
	private signUpModalActionForAddUser: string = TurismAppConstants.ADMIN_ADD_USER;
	private signUpModalActionForEditUser: string = TurismAppConstants.ADMIN_EDIT_USER;

	constructor(
		private _router: Router,
		private _userService: UserService,
		private _utilsService: UtilsService,
		private _modalService: BsModalService
	) { }

	ngOnInit() {
		let token = this._utilsService.checkAuthAndGetToken();
		if (token && token.role !== TurismAppConstants.ADMIN) {
			this._router.navigate(['/']);
		} else {
			this._getUsersBySearchCriteria();
		}
	}

	public openSignUpModal(action: string, userId?: number) {
		this.signUpModalRef = this._modalService.show(SignUpModalComponent, { class: 'modal-lg' });
		if (action === this.signUpModalActionForAddUser) {
			this.signUpModalRef.content.adminNewUser = this.signUpModalActionForAddUser;
		} else if (action === this.signUpModalActionForEditUser && userId != null) {
			this.signUpModalRef.content.adminEditUser = userId;
		}
		this._modalService.onHide.subscribe(res => {
			if (this.signUpModalRef.content.modificationsSavedSuccessfully) {
				this._getUsersBySearchCriteria();
			}
		});
	}

	public deleteUser(user: number) {
		this._userService.deleteUser(user).toPromise()
			.then(res => {
				this._getUsersBySearchCriteria();
			})
			.catch(err => console.log(err));
	}

	private _getUsersBySearchCriteria() {
		this._userService.getAllUsers(this.searchCriteria).subscribe(list => this.listOfUsers = list);
	}

	public searchForUsers(searchKeyWord: string) {
		this.searchCriteria.searchKeyword = searchKeyWord;
		this._getUsersBySearchCriteria();
	}
}