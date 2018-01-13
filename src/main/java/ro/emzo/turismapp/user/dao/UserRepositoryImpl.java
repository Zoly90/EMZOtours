package ro.emzo.turismapp.user.dao;

import org.springframework.util.StringUtils;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.user.model.Role;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.List;

/**
 * Created by E5570_2 on 2017-12-10.
 */
public class UserRepositoryImpl implements CustomUserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserInfo> findAllBySearchCriteriaWithPagination(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserInfo> query = builder.createQuery(UserInfo.class);

        Root<UserInfo> userRoot = query.from(UserInfo.class);

//        query.orderBy(builder.desc(user.get("creationDate")));

        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(userRoot.get("firstName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p2 = builder.like(
                    builder.lower(userRoot.get("lastName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p3 = builder.like(userRoot.get("telephoneNr"), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p4 = builder.like(userRoot.get("userLogin").get("emailAddress"), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate restriction = builder.or(p1, p2, p3, p4);
            query.where(restriction);
        }

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Long countAllBySearchCriteria(SearchCriteria searchCriteria) {
        return null;
    }

    @Override
    public List<UserLogin> findAllEmployees() {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserLogin> query = builder.createQuery(UserLogin.class);

        Root<UserLogin> userLoginRoot = query.from(UserLogin.class);

        Predicate p1 = builder.equal(
                userLoginRoot.get("role"), Role.ADMIN);
        Predicate p2 = builder.equal(
                userLoginRoot.get("role"), Role.EMPLOYEE);
        Predicate restriction = builder.or(p1, p2);
        query.where(restriction);

        return entityManager.createQuery(query).getResultList();
    }
}
