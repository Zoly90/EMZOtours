import { NgModule, ModuleWithProviders } from "@angular/core";
import { UserHolidaysList } from "./user-holidays-list/user-holidays-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
		SharedModule
  ],
  declarations: [
    UserHolidaysList
  ],
  exports: [
    
  ],
  providers: [
    
  ],
  entryComponents: [
    
  ]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule
    };
  }
}