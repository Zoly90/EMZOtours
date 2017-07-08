import { Injectable } from "@angular/core";
import { AuthorizationService } from "./authorization.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ErrorHandlingService {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  public handleHttpError(error) {
    if (error.status === 401) {
      this.authorizationService.clearCredentials();
      this.router.navigate(['/']);
    }
    this._logError(error);

    return Observable.throw('ceva');
  }

  private _logError(err) {
    console.log('errorService logging error:', err);
  }

}