package ro.emzo.turismapp.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.core.model.City;

/**
 * Created by E5570_2 on 2018-01-15.
 */
@Repository
public interface CityRepository extends JpaRepository<City, Long>{
}
