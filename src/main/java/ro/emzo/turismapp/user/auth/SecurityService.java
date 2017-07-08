package ro.emzo.turismapp.user.auth;

/**
 * Created by E5570_2 on 2017-06-30.
 */


public interface SecurityService {

    public String findLoggedInUsername();

    public void autologin(String username, String password);
}
