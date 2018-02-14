import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from "./shared/shared.module";
import { PagesModule } from "./pages/pages.module";
import { HolidayService } from "./holiday/services/holiday.service";
import { HolidayModule } from "./holiday/holiday.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { CoreModule } from "./core/core.module";
import { UserModule } from "./user/user.module";
import { Http } from "@angular/http";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HolidayModule,
    UserModule,
    CoreModule,
    SharedModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    HolidayService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
