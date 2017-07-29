package ro.emzo.turismapp.offer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.email.EmailServiceImpl;
import ro.emzo.turismapp.offer.dao.PersonalizedOfferDataService;
import ro.emzo.turismapp.offer.model.ApplyToUserTO;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;
import ro.emzo.turismapp.offer.model.Status;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.exceptions.InsufficientPermissionException;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.service.UserService;

@Service
public class PersonalizedOfferService {

	@Autowired
	private PersonalizedOfferDataService personalizedOfferDataService;
	
	@Autowired
	private EmailServiceImpl emailServiceImpl;

	@Autowired
	private UserDataService userDataService;

	@Autowired
	private UserService userService;
	
	public List<PersonalizedOffer> getPersonalizedOffers() {
		return personalizedOfferDataService.getAllPersonalizedOffers();
	}
	
	public PersonalizedOffer getPersonalizedOfferById(Long id) {
		return personalizedOfferDataService.getOnePersonalizedOfferById(id);
	}
	
	public PersonalizedOffer saveNewPersonalizedOffer(PersonalizedOffer personalizedOffer) {
		emailServiceImpl.sendNewPersonalizedOffer(new String[] {"zoli.incze@gmail.com"});
		return personalizedOfferDataService.savePersonalizedOffer(personalizedOffer);
	}

	public PersonalizedOffer applyToUser(ApplyToUserTO applyToUserTO) throws UserDoesNotExistInTheDatabase {
		PersonalizedOffer result = getPersonalizedOfferById(applyToUserTO.getOfferID());
		if (result.getUserInfo() != null && applyToUserTO.getUserID() == result.getUserInfo().getId()) {
			result.setStatus(Status.WIP);
		} else {
			UserInfo userInfo = userDataService.getUserInfo(applyToUserTO.getUserID());
			if (userInfo == null) {
				throw new UserDoesNotExistInTheDatabase();
			}
			result.setUserInfo(userInfo);
			result.setStatus(Status.WIP);
		}
		return personalizedOfferDataService.savePersonalizedOffer(result);
	}

	public PersonalizedOffer finalizeOffer(PersonalizedOffer offer) throws InsufficientPermissionException {
//		checkOfferBelongsToLoggedInUser(offer.getId());
		offer.setStatus(Status.DONE);
		return personalizedOfferDataService.savePersonalizedOffer(offer);
	}

	public void deleteOffer(Long offerId) throws InsufficientPermissionException {
//		checkOfferBelongsToLoggedInUser(offerId);
		personalizedOfferDataService.deleteOffer(offerId);
	}

	private void checkOfferBelongsToLoggedInUser(Long ticketId) throws InsufficientPermissionException {
		PersonalizedOffer personalizedOffer = personalizedOfferDataService.getOnePersonalizedOfferById(ticketId);
		UserInfo appliedTo = personalizedOffer.getUserInfo();
		String loggedInUsername = userService.getLoggedInUsername();
		System.out.println("result " + loggedInUsername);
		if (!appliedTo.getUserLogin().getUsername().equals(loggedInUsername)) {
			throw new InsufficientPermissionException();
		}
	}
}
