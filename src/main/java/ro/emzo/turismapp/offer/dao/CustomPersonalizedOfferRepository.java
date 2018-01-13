package ro.emzo.turismapp.offer.dao;

import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;

import java.util.List;

/**
 * Created by E5570_2 on 2017-12-15.
 */
@Repository
public interface CustomPersonalizedOfferRepository {

    /**
     * Find the personalized offers for a paginated UI table
     *
     * @param searchCriteria
     * @return users
     */
    List<PersonalizedOffer> findAllBySearchCriteriaWithPagination(SearchCriteria searchCriteria);

    /**
     * Count all personalized offers by search criteria
     *
     * @param searchCriteria
     * @return number of users
     */
    Long countAllBySearchCriteria(SearchCriteria searchCriteria);
}
