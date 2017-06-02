package ro.emzo.turismapp.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.core.model.PersonalizedOffer;
import ro.emzo.turismapp.core.service.PersonalizedOfferService;

@RestController
@RequestMapping("/api/turism-app/personalized-offer")
public class PersonalizedOfferController {

	@Autowired
	PersonalizedOfferService personalizedOfferService;
	
	@GetMapping
	public ResponseEntity<List<PersonalizedOffer>> getAllPersonalizedOffer() {
		return new ResponseEntity<>(personalizedOfferService.getPersonalizedOffers(), HttpStatus.OK);
	}
	
	@GetMapping("/{personalizedOfferId}")
	public ResponseEntity<PersonalizedOffer> getOnePersonalizedOffer(@PathVariable(name="personalizedOfferId") Long personalizedOfferId) {
		return new ResponseEntity<>(personalizedOfferService.getPersonalizedOfferById(personalizedOfferId), HttpStatus.OK);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
	public ResponseEntity<PersonalizedOffer> savePersonalizedOffer(@RequestBody PersonalizedOffer personalizedOffer) {
		return new ResponseEntity<>(personalizedOfferService.saveNewPersonalizedOffer(personalizedOffer), HttpStatus.OK);
	}
}
