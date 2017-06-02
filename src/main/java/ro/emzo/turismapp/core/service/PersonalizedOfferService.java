package ro.emzo.turismapp.core.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.PersonalizedOffer;
import ro.emzo.turismapp.data.integration.PersonalizedOfferDataService;

@Service
public class PersonalizedOfferService {

	@Autowired
	private PersonalizedOfferDataService personalizedOfferDataService;
	
	public List<PersonalizedOffer> getPersonalizedOffers() {
		return personalizedOfferDataService.getAllPersonalizedOffers();
	}
	
	public PersonalizedOffer getPersonalizedOfferById(Long id) {
		return personalizedOfferDataService.getOnePersonalizedOfferById(id);
	}
	
	public PersonalizedOffer saveNewPersonalizedOffer(PersonalizedOffer personalizedOffer) {
		return personalizedOfferDataService.savePersonalizedOffer(personalizedOffer);
	}
}
