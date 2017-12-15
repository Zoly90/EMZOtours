package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class InvalidPassword extends UserException {

    public InvalidPassword() {
        super("INVALID_PASSWORD", null);
    }
}
