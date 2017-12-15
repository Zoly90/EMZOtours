package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class EmailAlreadyExists extends UserException {

    public EmailAlreadyExists() {
        super("EMAIL_EXISTS_IN_DATABASE", null);
    }
}
