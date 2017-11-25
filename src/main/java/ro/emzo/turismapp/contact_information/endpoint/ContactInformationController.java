package ro.emzo.turismapp.contact_information.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.emzo.turismapp.contact_information.model.ContactInformation;
import ro.emzo.turismapp.contact_information.service.ContactInformationService;

/**
 * Created by E5570_2 on 2017-09-10.
 */

@RestController
@RequestMapping("/api/turism-app")
public class ContactInformationController {

    @Autowired
    private ContactInformationService contactInformationService;

    @GetMapping("/contact")
    public ResponseEntity<ContactInformation> getContactInformation() {
        return new ResponseEntity<>(contactInformationService.getContactInformation(), HttpStatus.OK);
    }

    @PostMapping(value = "/contact", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ContactInformation> updateContactInformation(@RequestBody ContactInformation newContactInformation) {
        return new ResponseEntity<>(contactInformationService.updateContactInformation(newContactInformation), HttpStatus.OK);
    }
}
