package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-12-10.
 */
public class InvalidOldPassword extends UserException {

    public InvalidOldPassword() {
        super("INVALID_OLD_PASSWORD", null);
    }
}
