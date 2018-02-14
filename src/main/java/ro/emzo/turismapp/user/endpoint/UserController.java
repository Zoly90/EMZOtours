package ro.emzo.turismapp.user.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.model.Reviews;
import ro.emzo.turismapp.holiday.to.HolidayListDataTO;
import ro.emzo.turismapp.user.auth.SecurityService;
import ro.emzo.turismapp.user.auth.UserValidator;
import ro.emzo.turismapp.user.exceptions.UserException;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.HolidayReview;
import ro.emzo.turismapp.user.service.UserService;
import ro.emzo.turismapp.user.to.*;

import javax.xml.ws.Response;

@RestController
@RequestMapping("/api/turism-app/user")
public class UserController {

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
    public ResponseEntity<AddOrUpdateUserTO> getUser(
            @PathVariable("userInfoId") Long userInfoId
    ) {
        AddOrUpdateUserTO user = userService.getUserForUpdate(userInfoId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<UserTableDataTO>> getAllUsers(
            @RequestBody SearchCriteria searchCriteria
    ) {
        List<UserTableDataTO> userTableData = userService.getAllUsers(searchCriteria);
        return new ResponseEntity<>(userTableData, HttpStatus.OK);
    }

    @PostMapping(value = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> registration(
            @RequestBody UserRegistrationTO newUser
    ) throws UserException {
        userService.registerUser(newUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<AddOrUpdateUserTO> createOrUpdateUser(
            @RequestBody AddOrUpdateUserTO user,
            @RequestParam("passwordChanged") String passwordChanged
    ) throws UserException, UserDoesNotExistInTheDatabase {
        user = userService.createOrUpdateUser(user, passwordChanged);
        return new ResponseEntity<>(user, HttpStatus.OK);
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

    @GetMapping("/all-employees")
    public ResponseEntity<List<EmployeeTO>> getAllStaff() {
        return new ResponseEntity<>(userService.getAllStaff(), HttpStatus.OK);
    }

    @GetMapping("/{userInfoId}/holidays")
    public ResponseEntity<List<UserHolidayListTO>> getHolidaysOfLoggedInUser(
            @PathVariable("userInfoId") Long userInfoId
    ) {
        return new ResponseEntity<>(userService.getHolidaysOfLoggedInUser(userInfoId), HttpStatus.OK);
    }

    @PostMapping("/{userInfoId}/{holidayId}/submit-review")
    public ResponseEntity<List<Reviews>> saveReview(
            @PathVariable("userInfoId") Long userInfoId,
            @PathVariable("holidayId") Long holidayId,
            @RequestBody HolidayReview holidayReview
    ) throws UserDoesNotExistInTheDatabase {
        return new ResponseEntity<>(userService.saveHolidayReview(userInfoId, holidayId, holidayReview), HttpStatus.OK);
    }

	@GetMapping("/{userInfoId}/holiday-wish-list")
	public ResponseEntity<List<HolidayListDataTO>> getHolidayWishlistOfLoggedInUser(
            @PathVariable("userInfoId") Long userInfoId
    ) {
		return new ResponseEntity<>(userService.getHolidayWishListForLoggedInUser(userInfoId), HttpStatus.OK);
	}

    @PostMapping("/{userInfoId}/{holidayId}/save-as-favorite")
    public ResponseEntity<Void> updateHolidayWishlistForLoggedInUser(
            @PathVariable("userInfoId") Long userInfoId,
            @PathVariable("holidayId") Long holidayId
    ) throws UserDoesNotExistInTheDatabase {
        userService.updateHolidayWishListForLoggedInUser(userInfoId, holidayId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
