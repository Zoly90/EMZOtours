package ro.emzo.turismapp.user.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.util.StringUtils;
import ro.emzo.turismapp.user.auth.UserValidator;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.exceptions.RegistrationException;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.UserAddress;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;
import ro.emzo.turismapp.user.to.UserAddressTO;
import ro.emzo.turismapp.user.to.UserInfoTO;
import ro.emzo.turismapp.user.to.UserLoginTO;
import ro.emzo.turismapp.utils.Utils;

@Service
public class UserService {

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserValidator userValidator;

    public String getUserLoggingIn(UserLoginTO userLoginTO) {
        String result = null;
        if ((StringUtils.isEmpty(userLoginTO.getEmailAddress()) && StringUtils.isEmpty(userLoginTO.getUsername())) ||
                StringUtils.isEmpty(userLoginTO.getPassword())) {
            return result;
        }

        if (!StringUtils.isEmpty(userLoginTO.getEmailAddress())) {
            UserLogin userLogin = checkCredentialsByEmail(userLoginTO.getEmailAddress());
            result = createToken(userLogin, userLoginTO);
        }

        if (!StringUtils.isEmpty(userLoginTO.getUsername())) {
            UserLogin userLogin = checkCredentialsByUsername(userLoginTO.getUsername());
            result = createToken(userLogin, userLoginTO);
        }

        return result;
    }


    public UserInfoTO registerUser(UserInfoTO userInfoTO) throws RegistrationException {
        if (!userValidator.validatePasswordEquality(userInfoTO.getUserLoginTO())) {
            return userInfoTO;
        }

        userValidator.checkExistingEmail(userInfoTO.getUserLoginTO());

        userValidator.checkExistingUsername(userInfoTO.getUserLoginTO());

        userValidator.validateUsernameLength(userInfoTO.getUserLoginTO());

        userValidator.validateEmailAddress(userInfoTO.getUserLoginTO());

        userValidator.validatePasswordLength(userInfoTO.getUserLoginTO());

        userValidator.validateDateOfBirthToBeOver18(userInfoTO);

        UserInfo userInfo = fromUserInfoTOToUserInfo(userInfoTO);
        userDataService.save(userInfo);
        userInfoTO = fromUserInfoToUserInfoTO(userInfo);

        return userInfoTO;
    }

    public void deleteUser(Long userId) {
        userDataService.deleteUser(userId);
    }

    public UserInfoTO updateExistingUser(UserInfoTO userInfoTO) throws UserDoesNotExistInTheDatabase {
        UserInfo userInfo = userDataService.getUserInfo(userInfoTO.getId());
        if (userInfo == null) {
            throw new UserDoesNotExistInTheDatabase();
        }

        userInfo = fromUserInfoTOToUserInfo(userInfoTO);
        userDataService.save(userInfo);
        userInfoTO = fromUserInfoToUserInfoTO(userInfo);

        return userInfoTO;
    }

    public UserLoginTO getUserLoginIfExists(UserLoginTO userLoginTO) {
        UserLoginTO result = null;
        UserLogin userLogin;
        if (!StringUtils.isEmpty(userLoginTO.getEmailAddress()) && Utils.isEmailAddress(userLoginTO.getEmailAddress())) {
            userLogin = userDataService.credentialsByEmail(userLoginTO.getEmailAddress());
        } else {
            userLogin = userDataService.credentialsByUsername(userLoginTO.getUsername());
        }

        if (userLogin != null) {
            result = fromUserLoginToUserLoginTO(userLogin);
        }

        return result;
    }

    public UserInfoTO getUserInfo(Long userInfoId) {
        UserInfo userInfo = userDataService.getUserInfo(userInfoId);
        return fromUserInfoToUserInfoTO(userInfo);
    }

    public List<UserInfo> getAllUsers() {
        return userDataService.getAllUsers();
    }

    private String encodePassword(String pass) {
        java.util.Base64.Encoder encoder = Base64.getEncoder();
        byte[] stringAsBytes = pass.getBytes();
        String encodedText = encoder.encodeToString(stringAsBytes);
        return encodedText;
    }

    private UserLoginTO fromUserLoginToUserLoginTO(UserLogin userLogin) {
        UserLoginTO userLoginTO = new UserLoginTO();
        userLoginTO.setId(userLogin.getId());
        userLoginTO.setUsername(userLogin.getUsername());
        userLoginTO.setEmailAddress(userLogin.getEmailAddress());
        userLoginTO.setPassword(userLogin.getPassword());
        userLoginTO.setRole(userLogin.getRole());
        return userLoginTO;
    }

    private UserLogin fromUserLoginTOToUserLogin(UserLoginTO userLoginTO) {
        UserLogin result = new UserLogin();
        result.setId(userLoginTO.getId());
        result.setUsername(userLoginTO.getUsername());
        result.setEmailAddress(userLoginTO.getEmailAddress());
        if (!org.apache.commons.codec.binary.Base64.isArrayByteBase64(userLoginTO.getPassword().getBytes())) {
            result.setPassword(encodePassword(userLoginTO.getPassword()));
        } else {
            result.setPassword(userLoginTO.getPassword());
        }
        result.setRole(userLoginTO.getRole());
        return result;
    }

    private UserAddressTO fromUserAddressToUserAddressTO(UserAddress userAddress) {
        UserAddressTO userAddressTO = null;
        if(userAddress != null) {
            userAddressTO = new UserAddressTO();
            userAddressTO.setId(userAddress.getId());
            userAddressTO.setCountry(userAddress.getCountry());
            userAddressTO.setCity(userAddress.getCity());
            userAddressTO.setStreet(userAddress.getCity());
            userAddressTO.setStreetNr(userAddress.getStreetNr());
            userAddressTO.setApartment(userAddress.getApartment());
            userAddressTO.setZip(userAddress.getZip());
        }
        return userAddressTO;
    }

    private UserAddress fromUserAddressTOToUserAddress(UserAddressTO userAddressTO) {
        UserAddress result = null;
        if (userAddressTO != null) {
            result = new UserAddress();
            result.setId(userAddressTO.getId());
            result.setCountry(userAddressTO.getCountry());
            result.setCity(userAddressTO.getCity());
            result.setStreet(userAddressTO.getStreet());
            result.setStreetNr(userAddressTO.getStreetNr());
            result.setApartment(userAddressTO.getApartment());
            result.setZip(userAddressTO.getZip());
        }
        return result;
    }

    private UserInfoTO fromUserInfoToUserInfoTO(UserInfo userInfo) {
        UserLoginTO userLoginTO = fromUserLoginToUserLoginTO(userInfo.getUserLogin());
        UserAddressTO userAddressTO = fromUserAddressToUserAddressTO(userInfo.getUserAddress());
        UserInfoTO userInfoTO = new UserInfoTO();
        userInfoTO.setId(userInfo.getId());
        userInfoTO.setTitle(userInfo.getTitle());
        userInfoTO.setFirstName(userInfo.getFirstName());
        userInfoTO.setLastName(userInfo.getLastName());
        userInfoTO.setBirthday(userInfo.getBirthday());
        userInfoTO.setTelephoneNr(userInfo.getTelephoneNr());
        userInfoTO.setNewsletter(userInfo.getNewsletter());
        userInfoTO.setUserLoginTO(userLoginTO);
        userInfoTO.setUserAddressTO(userAddressTO);
        return userInfoTO;
    }

    private UserInfo fromUserInfoTOToUserInfo(UserInfoTO userInfoTO) {
        UserLogin userLogin = fromUserLoginTOToUserLogin(userInfoTO.getUserLoginTO());
        UserAddress userAddress = fromUserAddressTOToUserAddress((userInfoTO.getUserAddressTO()));
        UserInfo result = new UserInfo();
        result.setId(userInfoTO.getId());
        result.setTitle(userInfoTO.getTitle());
        result.setFirstName(userInfoTO.getFirstName());
        result.setLastName(userInfoTO.getLastName());
        result.setBirthday(userInfoTO.getBirthday());
        result.setNewsletter(userInfoTO.getNewsletter());
        result.setTelephoneNr(userInfoTO.getTelephoneNr());
        result.setUserAddress(userAddress);
        result.setUserLogin(userLogin);
        return result;
    }

    private String createToken(UserLogin userLogin, UserLoginTO userLoginTO) {
        String result = null;
        if (userLogin != null && userLoginTO.getPassword().equals(userLogin.getPassword())) {
            UserInfo userInfo = userDataService.getUserInfo(userLogin);
            result = jwtService.createJWT(userInfo, 86400);
        }
        return result;
    }

    private UserLogin checkCredentialsByUsername(String username) {
        return userDataService.credentialsByUsername(username);
    }

    private UserLogin checkCredentialsByEmail(String email) {
        return userDataService.credentialsByEmail(email);
    }

    public String getLoggedInUsername() {
        String result = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            result = (String) authentication.getPrincipal();
        }
        return result;
    }
}
