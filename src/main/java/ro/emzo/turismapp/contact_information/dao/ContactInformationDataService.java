package ro.emzo.turismapp.contact_information.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.emzo.turismapp.contact_information.model.ContactInformation;

/**
 * Created by E5570_2 on 2017-09-10.
 */

@Service
public class ContactInformationDataService {

    @Autowired
    ContactInformationRepository contactInformationRepository;

    public ContactInformation getContactInformation(Long id) {
        return contactInformationRepository.findOne(id);
    }

    public ContactInformation saveContactInformation(ContactInformation newContactInformation) {
        return contactInformationRepository.save(newContactInformation);
    }
}
