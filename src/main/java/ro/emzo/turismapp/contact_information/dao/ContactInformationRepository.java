package ro.emzo.turismapp.contact_information.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.emzo.turismapp.contact_information.model.ContactInformation;

/**
 * Created by E5570_2 on 2017-09-10.
 */
public interface ContactInformationRepository extends JpaRepository<ContactInformation, Long> {
}
