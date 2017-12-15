import {AbstractControl, FormGroup} from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let passwordInput = group.controls[passwordKey];
      let confirmPasswordInput = group.controls[confirmPasswordKey];
      let password = passwordInput.value;
      let confirmPassword = confirmPasswordInput.value;
      if (password && password != confirmPassword) {
        return {
          passwordsDoNotMatch: true
        };
      }
      return null;
    }
  }

}