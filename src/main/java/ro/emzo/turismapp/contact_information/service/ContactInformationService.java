package ro.emzo.turismapp.contact_information.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.emzo.turismapp.contact_information.dao.ContactInformationDataService;
import ro.emzo.turismapp.contact_information.model.ContactInformation;

/**
 * Created by E5570_2 on 2017-09-10.
 */

@Service
public class ContactInformationService {

    @Autowired
    private ContactInformationDataService contactInformationDataService;

    public ContactInformation getContactInformation() {
        return contactInformationDataService.getContactInformation((long) 1);
    }

    public ContactInformation updateContactInformation(ContactInformation newContactInformation) {
        return contactInformationDataService.saveContactInformation(newContactInformation);
    }
}
