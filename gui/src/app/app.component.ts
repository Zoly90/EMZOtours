import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { AuthorizationService } from "./core/authentication/services/authorization.service";
// import { ToolbarComponent } from './common/toolbar/toolbar.component'
// import { NgbdModalBasic } from './modal-basic';
// import { NgbdDropdownBasic } from './dropdown-basic';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private token: any;
  private role: string;
  private userLogedIn: boolean = false;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.getToken();
    if (this.token != null) {
      this.role = this.token.role;
      this.userLogedIn = true;
    }
  }

  private loggingIn(logedIn: boolean) {
    if (logedIn) {
      this.userLogedIn = true;
      this.getToken();
      this.role = this.token.role;
    }
  }

  private loggingOut() {
    this.userLogedIn = false;
    this.token = null;
    this.role = '';
  }

  private getToken() {
    this.token = this.authorizationService.getDecodedToken();
  }
}
