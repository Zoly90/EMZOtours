package ro.emzo.turismapp.offer.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.offer.model.PersonalizedOffer;

public interface PersonalizedOfferRepository extends JpaRepository<PersonalizedOffer, Long> {

}
