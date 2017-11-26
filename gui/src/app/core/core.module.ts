// core
import { NgModule, ModuleWithProviders } from '@angular/core';

// custom services
import { HttpClientTokenService } from "../core/authentication/services/http-client.service";
import { ErrorHandlingService } from "../core/authentication/services/error-handling.service";
import { AuthorizationService } from "../core/authentication/services/authorization.service";
import { AuthenticationService } from "../core/authentication/services/authentication.service";
import { CategoriesAndTypesService } from "./services/categories-types.service";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
	declarations: [],
	exports: [],
	providers: [
		AuthenticationService,
		AuthorizationService,
		ErrorHandlingService,
		HttpClientTokenService,
		CategoriesAndTypesService
	]
})
export class CoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule
		};
	}
}
