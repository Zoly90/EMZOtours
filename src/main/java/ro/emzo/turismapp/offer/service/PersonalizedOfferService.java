package ro.emzo.turismapp.offer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.email.EmailServiceImpl;
import ro.emzo.turismapp.offer.dao.PersonalizedOfferDataService;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;

@Service
public class PersonalizedOfferService {

	@Autowired
	private PersonalizedOfferDataService personalizedOfferDataService;
	
	@Autowired
	private EmailServiceImpl emailServiceImpl;
	
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
}
