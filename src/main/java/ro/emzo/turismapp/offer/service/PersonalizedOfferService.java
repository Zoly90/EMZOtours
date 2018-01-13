package ro.emzo.turismapp.offer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.PagedList;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.email.EmailServiceImpl;
import ro.emzo.turismapp.offer.dao.PersonalizedOfferDataService;
import ro.emzo.turismapp.offer.dao.PersonalizedOfferRepository;
import ro.emzo.turismapp.offer.to.ApplyOfferToUserTO;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;
import ro.emzo.turismapp.offer.model.Status;
import ro.emzo.turismapp.offer.to.PersonalizedOfferTableDataTO;
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
	private PersonalizedOfferRepository offerRepository;
	
	@Autowired
	private EmailServiceImpl emailServiceImpl;

	@Autowired
	private UserDataService userDataService;

	@Autowired
	private UserService userService;
	
	public PagedList<PersonalizedOfferTableDataTO> getPersonalizedOffersBySearchCriteria(SearchCriteria searchCriteria) {
		PagedList<PersonalizedOfferTableDataTO> pagedList = new PagedList<>();
		pagedList.setOffset(searchCriteria.getPaginationCriteria().getOffset());
		pagedList.setItemsPerPage(searchCriteria.getPaginationCriteria().getItemsPerPage());
		List<PersonalizedOffer> offersList = offerRepository.findAllBySearchCriteriaWithPagination(searchCriteria);
		List<PersonalizedOfferTableDataTO> data = offersList.stream()
				.map(offer -> new PersonalizedOfferTableDataTO(offer.getId(), offer.getName(), offer.getTravelDestination(),
						offer.getFirstDayOfHoliday(), offer.getLastDayOfHoliday(),
						(offer.getUserInfo() != null ? offer.getUserInfo().getId() : null),
						(offer.getUserInfo() != null ? concatName(offer.getUserInfo().getFirstName(), offer.getUserInfo().getLastName()) : null),
						offer.getStatus()))
				.collect(Collectors.toList());
		pagedList.setData(data);
		Long totalItems = offerRepository.countAllBySearchCriteria(searchCriteria);
		pagedList.setItemsTotal(totalItems);
		return pagedList;
	}

	private String concatName(String firstName, String lastName) {
		String result = ((firstName != null && firstName != "") ? firstName : "")
				+ ((lastName != null && lastName != "") ? " " + lastName : "");
		return result;
	}
	
	public PersonalizedOffer getPersonalizedOfferById(Long id) {
		return personalizedOfferDataService.getOnePersonalizedOfferById(id);
	}
	
	public PersonalizedOffer saveNewPersonalizedOffer(PersonalizedOffer personalizedOffer) {
		emailServiceImpl.sendNewPersonalizedOffer(new String[] {"zoli.incze@gmail.com"});
		return personalizedOfferDataService.savePersonalizedOffer(personalizedOffer);
	}

	public PersonalizedOffer applyToUser(ApplyOfferToUserTO applyOfferToUserTO) throws UserDoesNotExistInTheDatabase {
		PersonalizedOffer result = getPersonalizedOfferById(applyOfferToUserTO.getOfferID());
		if (result.getUserInfo() != null && applyOfferToUserTO.getUserID() == result.getUserInfo().getId()) {
			result.setStatus(Status.WIP);
		} else {
			UserInfo userInfo = userDataService.getUserInfo(applyOfferToUserTO.getUserID());
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
