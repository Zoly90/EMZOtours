package ro.emzo.turismapp.user.exceptions;

import ro.emzo.turismapp.commons.exceptions.TurismAppException;

/**
 * Created by E5570_2 on 2017-07-12.
 */
public class UserDoesNotExistInTheDatabase extends TurismAppException {

    public UserDoesNotExistInTheDatabase() {
        super("USER_DOES_NOT_EXIST_IN_THE_DATABASE", null);
    }
}
