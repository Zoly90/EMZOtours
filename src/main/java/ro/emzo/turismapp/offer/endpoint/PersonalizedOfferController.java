package ro.emzo.turismapp.offer.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ro.emzo.turismapp.core.model.PagedList;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.offer.to.ApplyOfferToUserTO;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;
import ro.emzo.turismapp.offer.service.PersonalizedOfferService;
import ro.emzo.turismapp.offer.to.PersonalizedOfferTableDataTO;
import ro.emzo.turismapp.user.exceptions.InsufficientPermissionException;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;

@RestController
@RequestMapping("/api/turism-app/personalized-offer")
public class PersonalizedOfferController {

    @Autowired
    PersonalizedOfferService personalizedOfferService;

    @PostMapping(value = "/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PagedList<PersonalizedOfferTableDataTO>> getPersonalizedOffersBySearchCriteria(
            @RequestBody SearchCriteria searchCriteria
    ) {
        PagedList<PersonalizedOfferTableDataTO> offersTableData = personalizedOfferService.getPersonalizedOffersBySearchCriteria(searchCriteria);
        return new ResponseEntity<>(offersTableData, HttpStatus.OK);
    }

    @GetMapping("/{personalizedOfferId}")
    public ResponseEntity<PersonalizedOffer> getOnePersonalizedOffer(@PathVariable(name = "personalizedOfferId") Long personalizedOfferId) {
        return new ResponseEntity<>(personalizedOfferService.getPersonalizedOfferById(personalizedOfferId), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PersonalizedOffer> savePersonalizedOffer(@RequestBody PersonalizedOffer personalizedOffer) {
        return new ResponseEntity<>(personalizedOfferService.saveNewPersonalizedOffer(personalizedOffer), HttpStatus.OK);
    }

    @PostMapping(value = "/apply", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PersonalizedOffer> applyToUser(@RequestBody ApplyOfferToUserTO applyOfferToUserTO) throws UserDoesNotExistInTheDatabase {
        return new ResponseEntity<>(personalizedOfferService.applyToUser(applyOfferToUserTO), HttpStatus.OK);
    }

    @PostMapping(value = "/finalize", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PersonalizedOffer> applyToUser(@RequestBody PersonalizedOffer personalizedOffer) throws InsufficientPermissionException {
        return new ResponseEntity<>(personalizedOfferService.finalizeOffer(personalizedOffer), HttpStatus.OK);
    }

    @DeleteMapping("/{personalizedOfferId}")
    public ResponseEntity<Void> deletePersonalizedOffer(@PathVariable("personalizedOfferId") Long personalizedOfferId) throws InsufficientPermissionException {
        personalizedOfferService.deleteOffer(personalizedOfferId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
