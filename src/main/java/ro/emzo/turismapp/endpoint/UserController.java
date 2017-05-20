package ro.emzo.turismapp.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.core.model.UserInfo;
import ro.emzo.turismapp.core.model.UserLogin;
import ro.emzo.turismapp.core.service.UserService;

@RestController
@RequestMapping("/api/turism-app")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("login/{username}")
	public ResponseEntity<UserInfo> getUserByUsername(@PathVariable(name="username") String username) {
		return new ResponseEntity<>(userService.getUserLoggingIn(username), HttpStatus.OK);
	}
	
	@GetMapping("user/{userInfoId}")
	public ResponseEntity<UserInfo> getUser(@PathVariable("userInfoId") Long userInfoId) {
		return new ResponseEntity<>(userService.getUserInfo(userInfoId), HttpStatus.OK);
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<UserInfo>> getAllUsers() {
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<UserInfo> createTicket(@RequestBody UserInfo userInfo) {
        return new ResponseEntity<>(userService.createUser(userInfo), HttpStatus.OK);
    }

}
