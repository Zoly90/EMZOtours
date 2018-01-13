package ro.emzo.turismapp.user.dao;

import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;

import java.util.List;

/**
 * Created by E5570_2 on 2017-12-10.
 */

@Repository
public interface CustomUserRepository {

    /**
     * Find the users for a paginated UI table
     *
     * @param searchCriteria
     * @return users
     */
    List<UserInfo> findAllBySearchCriteriaWithPagination(SearchCriteria searchCriteria);

    /**
     * Count all the users by search criteria
     *
     * @param searchCriteria
     * @return number of users
     */
    Long countAllBySearchCriteria(SearchCriteria searchCriteria);

    /**
     * Find all employees
     *
     * @return users
     */
    List<UserLogin> findAllEmployees();
}
