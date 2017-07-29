package ro.emzo.turismapp.user.exceptions;

import ro.emzo.turismapp.commons.exceptions.TurismAppException;

/**
 * Created by E5570_2 on 2017-07-29.
 */
public class InsufficientPermissionException extends TurismAppException {

    public InsufficientPermissionException() {
        super("INSUFFICIENT_PERMISSION", null);
    }
}
