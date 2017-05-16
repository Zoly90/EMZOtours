import { Component } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
// import { ToolbarComponent } from './common/toolbar/toolbar.component'
// import { NgbdModalBasic } from './modal-basic';
// import { NgbdDropdownBasic } from './dropdown-basic';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
