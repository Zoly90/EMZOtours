package ro.emzo.turismapp.holiday.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.emzo.turismapp.holiday.service.ApplyForOfferService;
import ro.emzo.turismapp.holiday.to.ApplyForOfferTO;
import ro.emzo.turismapp.user.to.UserCreditCardTO;

/**
 * Created by E5570_2 on 2017-09-25.
 */

@RestController
@RequestMapping("/api/turism-app/apply-for-offer")
public class ApplyForOfferController {

    @Autowired
    private ApplyForOfferService applyForOfferService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserCreditCardTO> getUsersCreditCardData(
            @PathVariable("userId") Long userId
    ) {
        return new ResponseEntity<>(applyForOfferService.getUserCreditCardData(userId), HttpStatus.OK);
    }

    @PostMapping(value = "/{offerPeriodId}/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> applyForOffer(
            @PathVariable("offerPeriodId") Long offerPeriodId,
            @PathVariable("userId") Long userId,
            @RequestBody ApplyForOfferTO applyForOfferTO
    ) {
        applyForOfferService.applyForOffer(applyForOfferTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
