package ro.emzo.turismapp.data.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.PersonalizedOffer;

@Service
public class PersonalizedOfferDataService {

	@Autowired
	private PersonalizedOfferRepository personalizedOfferRepository;
	
	public List<PersonalizedOffer> getAllPersonalizedOffers() {
		return personalizedOfferRepository.findAll();
	}
	
	public PersonalizedOffer getOnePersonalizedOfferById(Long id) {
		return personalizedOfferRepository.findOne(id);
	}
	
	public PersonalizedOffer savePersonalizedOffer(PersonalizedOffer personalizedOffer) {
		return personalizedOfferRepository.save(personalizedOffer);
	}
}
