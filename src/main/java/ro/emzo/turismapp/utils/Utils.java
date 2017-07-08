package ro.emzo.turismapp.utils;

import java.util.regex.Pattern;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class Utils {

    public static boolean isEmailAddress(String input) {
        return Pattern.matches(Constants.EMAIL_REGEX, input);
    }
}
