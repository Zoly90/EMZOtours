package ro.emzo.turismapp.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.core.model.Country;

/**
 * Created by E5570_2 on 2018-01-07.
 */
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
}
