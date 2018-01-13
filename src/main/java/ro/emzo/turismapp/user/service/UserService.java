package ro.emzo.turismapp.user.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.util.StringUtils;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.service.ApplyForOfferService;
import ro.emzo.turismapp.user.auth.UserValidator;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.dao.UserRepository;
import ro.emzo.turismapp.user.exceptions.UserException;
import ro.emzo.turismapp.user.exceptions.IncompleteChangeMyPasswordFlow;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.*;
import ro.emzo.turismapp.user.to.*;
import ro.emzo.turismapp.utils.Utils;

@Service
public class UserService {

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private ApplyForOfferService applyForOfferService;

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


    public void registerUser(UserRegistrationTO userRegistrationTO) throws UserException {
        userValidator.validatePasswordEquality(userRegistrationTO.getPassword(), userRegistrationTO.getPasswordConfirm());

        userValidator.checkExistingEmail(userRegistrationTO.getEmailAddress());

        userValidator.checkExistingUsername(userRegistrationTO.getUsername());

        userValidator.validateUsernameLength(userRegistrationTO.getUsername());

        userValidator.validateEmailAddress(userRegistrationTO.getEmailAddress());

        userValidator.validatePassword(userRegistrationTO.getPassword());

        userValidator.validateDateOfBirthToBeOver18(userRegistrationTO.getBirthday());

        UserInfo userInfo = fromUserRegistrationTOToUserInfo(userRegistrationTO);
        userDataService.save(userInfo);
    }

    private UserInfo fromUserRegistrationTOToUserInfo(UserRegistrationTO userRegistrationTO) {
        UserInfo result = new UserInfo();
        UserLogin userLogin = new UserLogin();
        userLogin.setEmailAddress(userRegistrationTO.getEmailAddress());
        userLogin.setUsername(userRegistrationTO.getUsername());
        userLogin.setPassword(encodePassword(userRegistrationTO.getPassword()));
        userLogin.setRole(userRegistrationTO.getRole());
        result.setTitle(userRegistrationTO.getTitle());
        result.setFirstName(userRegistrationTO.getFirstName());
        result.setLastName(userRegistrationTO.getLastName());
        result.setTelephoneNr(userRegistrationTO.getTelephoneNr());
        result.setBirthday(userRegistrationTO.getBirthday());
        result.setNewsletter(userRegistrationTO.getNewsletter());
        result.setUserLogin(userLogin);
        return result;
    }

    public AddOrUpdateUserTO createOrUpdateUser(AddOrUpdateUserTO userModel, String passwordChanged)
            throws UserDoesNotExistInTheDatabase, UserException {

        UserInfo userEntity = null;
        UserInfoTO userInfoTO = userModel.getUserInfo();
        UserLoginTO userLoginTO = userModel.getUserLogin();
        UserAddressTO userAddressTO = userModel.getUserAddress();
        UserIdentityTO userIdentityTO = userModel.getUserIdentity();
        UserCreditCardTO userCreditCardTO = userModel.getUserCreditCard();

        boolean editMode = false;
        if (userInfoTO.getId() != null) {
            editMode = true;

            userEntity = userDataService.getUserInfo(userInfoTO.getId());
            if (userEntity == null) {
                throw new UserDoesNotExistInTheDatabase();
            }

            if (StringUtils.hasLength(passwordChanged)) {
                if (StringUtils.isEmpty(userLoginTO.getOldPassword())) {
                    throw new IncompleteChangeMyPasswordFlow();
                }

                userValidator.validateOldPassword(userLoginTO.getOldPassword(), userEntity.getUserLogin().getPassword());

                userValidator.validatePassword(userLoginTO.getPassword());

                userValidator.validatePasswordEquality(userLoginTO.getPassword(), userLoginTO.getPasswordConfirm());

                userEntity.getUserLogin().setPassword(userLoginTO.getPassword());
            }
        }

        if (!editMode) {
            userValidator.checkExistingEmail(userLoginTO.getEmailAddress());
            userValidator.checkExistingUsername(userLoginTO.getUsername());
        }

        userValidator.validateUsernameLength(userLoginTO.getUsername());

        userValidator.validateEmailAddress(userLoginTO.getEmailAddress());

        userValidator.validateDateOfBirthToBeOver18(userInfoTO.getBirthday());

        userEntity = fromUserInfoTOToUserInfo(userInfoTO);
        userEntity.setUserLogin(fromUserLoginTOToUserLogin(userLoginTO, editMode, false));
        userEntity.setUserIdentity(fromUserIdentityTOToUserIdentity(userIdentityTO));

        if (userLoginTO.getRole() != Role.CLIENT) {
            userValidator.checkIfUserAddressExistsForAdminAndEmployee(userAddressTO);

            userValidator.checkIfTelephoneNrExistsForAdminAndEmployee(userInfoTO.getTelephoneNr());

            userEntity.setUserAddress(fromUserAddressTOToUserAddress(userAddressTO));
        } else {
            userEntity.setUserCreditCard(fromUserCreditCardTOToUserCreditCard(userCreditCardTO));
        }

        userDataService.save(userEntity);

        return userModel;
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

    public AddOrUpdateUserTO getUserForUpdate(Long userId) {
        AddOrUpdateUserTO result = new AddOrUpdateUserTO();
        UserInfo userInfo = userDataService.getUserInfo(userId);
        result.setUserInfo(fromUserInfoToUserInfoTO(userInfo));
        result.setUserLogin(fromUserLoginToUserLoginTO(userInfo.getUserLogin()));
        result.setUserAddress(fromUserAddressToUserAddressTO(userInfo.getUserAddress()));
        result.setUserIdentity(fromUserIdentityToUserIdentityTO(userInfo.getUserIdentity()));
        result.setUserCreditCard(fromUserCreditCardToUserCreditCardTO(userInfo.getUserCreditCard()));
        return result;
    }

    public List<UserTableDataTO> getAllUsers(SearchCriteria searchCriteria) {
        List<UserInfo> userInfoList = userRepository.findAllBySearchCriteriaWithPagination(searchCriteria);
        List<UserTableDataTO> userTableData = userInfoList.stream()
                .map(user -> new UserTableDataTO(user.getId(), user.getFirstName(), user.getLastName(), user.getUserLogin().getRole().getRoleKey(),
                        user.getTelephoneNr(), user.getUserLogin().getEmailAddress(), false, user.getNewsletter()))
                .collect(Collectors.toList());
        return userTableData;
    }

    public List<EmployeeTO> getAllStaff() {
        List<UserLogin> staffDatabaseList = userRepository.findAllEmployees();
        List<EmployeeTO> staffList = new ArrayList<>();
        for (UserLogin staffUserLogin : staffDatabaseList) {
            UserInfo userInfo = userRepository.findByUserLogin(staffUserLogin);
            staffList.add(new EmployeeTO(userInfo.getId(), concatFirstNameWithLastName(userInfo.getFirstName(), userInfo.getLastName())));
        }
        return staffList;
    }

    public UserCreditCardTO getUserCreditCardData(Long userInfoId) {
        UserCreditCardTO result;
        UserInfo userInfo = userDataService.getUserInfo(userInfoId);
        UserCreditCard userCreditCard = userInfo.getUserCreditCard();
        result = fromUserCreditCardToUserCreditCardTO(userCreditCard);
        return result;
    }

    private UserIdentityTO fromUserIdentityToUserIdentityTO(UserIdentity userIdentity) {
        UserIdentityTO result = null;
        if (userIdentity != null) {
            result = new UserIdentityTO();
            result.setId(userIdentity.getId());
            result.setCnp(userIdentity.getCnp());
            result.setIdentityCardNumber(userIdentity.getIdentityCardNumber());
            result.setIdentityCardSeries(userIdentity.getIdentityCardSeries());
            result.setIban(userIdentity.getIban());
            result.setIdCardExpirationDate(userIdentity.getIdCardExpirationDate());
        }
        return result;
    }

    private UserIdentity fromUserIdentityTOToUserIdentity(UserIdentityTO userIdentityTO) {
        UserIdentity result = new UserIdentity();
        result.setId(userIdentityTO.getId());
        result.setCnp(userIdentityTO.getCnp());
        result.setIdentityCardNumber(userIdentityTO.getIdentityCardNumber());
        result.setIdentityCardSeries(userIdentityTO.getIdentityCardSeries());
        result.setIdCardExpirationDate(userIdentityTO.getIdCardExpirationDate());
        result.setIban(userIdentityTO.getIban());
        return result;
    }

    private UserCreditCardTO fromUserCreditCardToUserCreditCardTO(UserCreditCard userCreditCard) {
        UserCreditCardTO result = null;
        if (userCreditCard != null) {
            result = new UserCreditCardTO();
            result.setId(userCreditCard.getId());
            result.setCreditCardNumber(userCreditCard.getCreditCardNumber());
            result.setCreditCardExpirationDate(userCreditCard.getExpirationDate());
            result.setCreditCardUserName(userCreditCard.getCreditCardUserName());
        }
        return result;
    }

    private UserCreditCard fromUserCreditCardTOToUserCreditCard(UserCreditCardTO userCreditCardTO) {
        UserCreditCard result = new UserCreditCard();
        result.setId(userCreditCardTO.getId());
        result.setCreditCardNumber(userCreditCardTO.getCreditCardNumber());
        result.setExpirationDate(userCreditCardTO.getCreditCardExpirationDate());
        result.setCreditCardUserName(userCreditCardTO.getCreditCardUserName());
        return result;
    }

    private String encodePassword(String pass) {
        java.util.Base64.Encoder encoder = Base64.getEncoder();
        byte[] stringAsBytes = pass.getBytes();
        String encodedText = encoder.encodeToString(stringAsBytes);
        return encodedText;
    }

    private UserLoginTO fromUserLoginToUserLoginTO(UserLogin existingUserLogin) {
        UserLoginTO userLogin = new UserLoginTO();
        userLogin.setId(existingUserLogin.getId());
        userLogin.setUsername(existingUserLogin.getUsername());
        userLogin.setEmailAddress(existingUserLogin.getEmailAddress());
        userLogin.setRole(existingUserLogin.getRole());
        return userLogin;
    }

    private UserLogin fromUserLoginTOToUserLogin(UserLoginTO userLoginTO, boolean editMode, boolean signUpMode) {
        UserLogin result = new UserLogin();
        result.setId(userLoginTO.getId());
        result.setUsername(userLoginTO.getUsername());
        result.setEmailAddress(userLoginTO.getEmailAddress());
        if (!editMode && signUpMode) {
            if (!org.apache.commons.codec.binary.Base64.isArrayByteBase64(userLoginTO.getPassword().getBytes())) {
                result.setPassword(encodePassword(userLoginTO.getPassword()));
            } else {
                result.setPassword(userLoginTO.getPassword());
            }
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
        UserInfoTO userInfoTO = new UserInfoTO();
        userInfoTO.setId(userInfo.getId());
        userInfoTO.setTitle(userInfo.getTitle());
        userInfoTO.setFirstName(userInfo.getFirstName());
        userInfoTO.setLastName(userInfo.getLastName());
        userInfoTO.setBirthday(userInfo.getBirthday());
        userInfoTO.setTelephoneNr(userInfo.getTelephoneNr());
        userInfoTO.setNewsletter(userInfo.getNewsletter());
        return userInfoTO;
    }

    private UserInfo fromUserInfoTOToUserInfo(UserInfoTO userInfoTO) {
        UserInfo result = new UserInfo();
        result.setId(userInfoTO.getId());
        result.setTitle(userInfoTO.getTitle());
        result.setFirstName(userInfoTO.getFirstName());
        result.setLastName(userInfoTO.getLastName());
        result.setBirthday(userInfoTO.getBirthday());
        result.setNewsletter(userInfoTO.getNewsletter());
        result.setTelephoneNr(userInfoTO.getTelephoneNr());
        return result;
    }

    private String createToken(UserLogin userLogin, UserLoginTO userLoginTO) {
        String result = null;
        if (userLogin != null && userLoginTO.getPassword().equals(userLogin.getPassword())) {
            UserInfo userInfo = userDataService.getUserInfo(userLogin);
            result = jwtService.createJWT(userInfo, 86400000);
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

    private String concatFirstNameWithLastName(String firstName, String lastName) {
        return ((firstName != null || firstName != "") ? firstName : "")
                    + ((lastName != null || lastName != "") ? " " + lastName : "");
    }
}
