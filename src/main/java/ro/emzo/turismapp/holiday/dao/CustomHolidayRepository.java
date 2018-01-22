package ro.emzo.turismapp.holiday.dao;

import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.model.Holiday;

import java.util.List;

/**
 * Created by E5570_2 on 2018-01-13.
 */
@Repository
public interface CustomHolidayRepository {

    /**
     * Find the holidays for the paginated UI management table
     *
     * @param searchCriteria
     * @return users
     */
    List<Holiday> findAllBySearchCriteriaWithPaginationForHolidayList(SearchCriteria searchCriteria);

    /**
     * Count all holidays for the paginated UI management table by search criteria
     *
     * @param searchCriteria
     * @return number of users
     */
    Long countAllBySearchCriteriaForHolidayList(SearchCriteria searchCriteria);

    /**
     * Find the holidays for the paginated UI management table
     *
     * @param searchCriteria
     * @return users
     */
    List<Holiday> findAllBySearchCriteriaWithPaginationForQuickFilter(SearchCriteria searchCriteria);

    /**
     * Count all holidays for the paginated UI management table by search criteria
     *
     * @param searchCriteria
     * @return number of users
     */
    Long countAllBySearchCriteriaForQuickFilter(SearchCriteria searchCriteria);

    /**
     * Find the holidays for the paginated UI management table
     *
     * @param searchCriteria
     * @return users
     */
    List<Holiday> findAllBySearchCriteriaWithPaginationForManagementTable(SearchCriteria searchCriteria);

    /**
     * Count all holidays for the paginated UI management table by search criteria
     *
     * @param searchCriteria
     * @return number of users
     */
    Long countAllBySearchCriteriaForManagementTable(SearchCriteria searchCriteria);
}
