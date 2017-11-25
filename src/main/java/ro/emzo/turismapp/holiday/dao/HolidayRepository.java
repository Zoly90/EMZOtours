package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.holiday.model.HolidaySummary;
import ro.emzo.turismapp.holiday.model.OfferInformation;

public interface HolidayRepository extends JpaRepository<HolidaySummary, Long>{

    HolidaySummary findByOfferInformation(OfferInformation offerInformation);
}
