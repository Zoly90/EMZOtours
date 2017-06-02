package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.PersonalizedOffer;

public interface PersonalizedOfferRepository extends JpaRepository<PersonalizedOffer, Long> {

}