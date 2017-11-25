import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { AuthorizationService } from "./core/authentication/services/authorization.service";
import { Router } from "@angular/router";
import { UtilsService } from "./utils/utils.service";
import { CategoriesAndTypesService } from "./core/services/categories-types.service";
import { Types } from "./core/models/types.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public backgroundImagePath = "../../assets/images/background/rsz_background.jpg";

  private token: any;
  private types: Types[];
  private role: string;
  private userLogedIn: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
    private utilsService: UtilsService,
    private router: Router,
    private categoriesAndTypesService: CategoriesAndTypesService
  ) {
    this.categoriesAndTypesService.setCategoriesAndTypes();
  }

  ngOnInit() {
    this.token = this.utilsService.checkAuthAndGetToken();
    if (this.token != null) {
      this.role = this.token.role;
      this.userLogedIn = true;
    }
  }

  private loggingIn(logedIn: boolean) {
    if (logedIn) {
      this.userLogedIn = true;
      this.token = this.utilsService.checkAuthAndGetToken();
      this.role = this.token.role;
    }
  }

  private loggingOut() {
    this.userLogedIn = false;
    this.token = null;
    this.role = '';
    this.router.navigate(['/']);
  }
}
