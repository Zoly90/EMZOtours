import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from 'lodash'
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";
import { TurismAppConstants } from "../../../utils/constants";
import { User } from "../../../shared/models/user.model";
import { UserService } from "../../../shared/services/user.service";

@Component({
	selector: 'user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

	private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';
	private listOfUsers: Array<User> = new Array<User>();

	constructor(
		private router: Router,
		private userService: UserService,
		private authorizationService: AuthorizationService
	) { }

	ngOnInit() {
		let token = this.authorizationService.getDecodedToken();
		if (token == null || token.role !== TurismAppConstants.ADMIN) {
			this.router.navigate(['/']);
		} else {
			this.userService.getAllUsers().subscribe(list => this.listOfUsers = list);
		}
	}

	public updateUser(user: User) {
		this.goToDetailPage(user);
	}

	public deleteUser(user: User) {
		this.userService.deleteUser(user.id).toPromise()
			.then(res => {
				this.listOfUsers.splice(_.findIndex(
					this.listOfUsers, function (o) {
						return o.id === user.id;
					}), 1)
			})
			.catch(err => console.log(err));
	}

	private goToDetailPage(user: User) {
		this.router.navigate(['holiday/' + user.id]);
	}
}