package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class UsernameAlreadyExists extends UserException {

    public UsernameAlreadyExists() {
        super("USERNAME_EXISTS_IN_DATABASE" ,null);
    }
}
