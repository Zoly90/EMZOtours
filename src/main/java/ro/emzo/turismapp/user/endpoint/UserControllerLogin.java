package ro.emzo.turismapp.user.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.emzo.turismapp.user.auth.SecurityService;
import ro.emzo.turismapp.user.auth.UserValidator;
import ro.emzo.turismapp.user.service.UserService;
import ro.emzo.turismapp.user.to.UserLoginTO;

/**
 * Created by E5570_2 on 2017-07-03.
 */

@RestController
@RequestMapping("/api/turism-app/login")
public class UserControllerLogin {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getUserByUsername(@RequestBody UserLoginTO userLoginTO) {
        String token = userService.getUserLoggingIn(userLoginTO);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping(value="/reset-password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<UserLoginTO> forgotPassword(@RequestBody UserLoginTO userLoginTO) {
        return new ResponseEntity<>(userService.getUserLoginIfExists(userLoginTO), HttpStatus.OK);
    }
}
