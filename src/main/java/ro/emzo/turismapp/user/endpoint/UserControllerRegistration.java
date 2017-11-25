package ro.emzo.turismapp.user.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import ro.emzo.turismapp.user.auth.SecurityService;
import ro.emzo.turismapp.user.auth.UserValidator;
import ro.emzo.turismapp.user.exceptions.RegistrationException;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;
import ro.emzo.turismapp.user.service.UserService;
import ro.emzo.turismapp.user.to.UserCreditCardTO;
import ro.emzo.turismapp.user.to.UserInfoTO;
import ro.emzo.turismapp.user.to.UserLoginTO;

@RestController
@RequestMapping("/api/turism-app/user")
public class UserControllerRegistration {
	
	@Autowired
	private UserService userService;

	@Autowired
	private SecurityService securityService;

	@Autowired
	private UserValidator userValidator;

//	@GetMapping("registration")
//	public String registration(Model model) {
//		model.addAttribute("userForm", new UserLogin());
//		return "registration";
//	}
//
//	@PostMapping("registration")
//	public String registration(@ModelAttribute("userForm") UserLoginTO userForm, BindingResult bindingResult, Model model) {
//		userValidator.validate(userForm, bindingResult);
//
//		if (bindingResult.hasErrors()) {
//			return "registration";
//		}
//
//		userService.save(userForm);
//		securityService.autologin(userForm.getEmailAddress(), userForm.getPasswordConfirm());
//		return "redirect:/welcome";
//	}
//
//	@GetMapping("login")
//	public String login(Model model, String error, String logout) {
//		if (error != null) {
//			model.addAttribute("error", "Your username and password are invalid!");
//		}
//
//		if (logout != null) {
//			model.addAttribute("message", "You have been logged out successfully.");
//		}
//
//		return "login";
//	}
//
//	@GetMapping({"/", "welcome"})
//	public String welcome(Model model) {
//		return "welcome";
//	}
	
	@GetMapping("/{userInfoId}")
	public ResponseEntity<UserInfoTO> getUser(
			@PathVariable("userInfoId") Long userInfoId
	) {
		return new ResponseEntity<>(userService.getUserInfo(userInfoId), HttpStatus.OK);
	}
	
	@GetMapping()
	public ResponseEntity<List<UserInfo>> getAllUsers() {
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}
	
	@PostMapping(value="/registration", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<UserInfoTO> registration(
    		@RequestBody UserInfoTO userInfoTO
	) throws RegistrationException {
        return new ResponseEntity<>(userService.registerUser(userInfoTO), HttpStatus.OK);
    }

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<UserInfoTO> updateExistingUser(
			@RequestBody UserInfoTO userInfoTO
	) throws UserDoesNotExistInTheDatabase {
		return new ResponseEntity<>(userService.updateExistingUser(userInfoTO), HttpStatus.OK);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteUser(
			@PathVariable("userId") Long userId
	) {
		userService.deleteUser(userId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{userInfoId}/credit-card-data")
	public ResponseEntity<UserCreditCardTO> getUserCreditCardData(
			@PathVariable("userInfoId") Long userInfoId
	) {
		return new ResponseEntity<>(userService.getUserCreditCardData(userInfoId), HttpStatus.OK);
	}
}
