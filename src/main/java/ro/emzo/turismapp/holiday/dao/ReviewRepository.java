package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.emzo.turismapp.holiday.model.Reviews;

/**
 * Created by E5570_2 on 2018-02-08.
 */
public interface ReviewRepository extends JpaRepository<Reviews, Long> {
}
