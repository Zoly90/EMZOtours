package ro.emzo.turismapp.offer.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.util.StringUtils;
import ro.emzo.turismapp.core.model.FilterCriteria;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;
import ro.emzo.turismapp.offer.model.Status;
import ro.emzo.turismapp.user.dao.UserRepository;
import ro.emzo.turismapp.user.model.UserInfo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by E5570_2 on 2017-12-15.
 */
public class PersonalizedOfferRepositoryImpl implements CustomPersonalizedOfferRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<PersonalizedOffer> findAllBySearchCriteriaWithPagination(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<PersonalizedOffer> query = builder.createQuery(PersonalizedOffer.class);

        Root<PersonalizedOffer> personalizedOfferRoot = query.from(PersonalizedOffer.class);

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(personalizedOfferRoot.get("name")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
//            Predicate p2 = builder.like(personalizedOfferRoot.get("id"), "%" + searchCriteria.getSearchKeyword() + "%");

            searchRestriction = builder.or(p1);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filters = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("status")) {
                        p = builder.equal(
                                personalizedOfferRoot.get(filterCriteria.getField()), Status.fromString(filterCriteria.getValue()));
                    }
                    if (filterCriteria.getField().equals("userInfo")) {
                        UserInfo userInfo = userRepository.getOne(new Long(filterCriteria.getValue()));
                        p = builder.equal(
                                personalizedOfferRoot.get(filterCriteria.getField()), userInfo);
                    }
                    if (filterCriteria.getField().equals("travelDestination")) {
                        p = builder.like(
                                personalizedOfferRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                }
                if (filters != null) {
                    if (filterCriteria.getField().equals("status")) {
                        filters = builder.or(filters, p);
                    } else {
                        filters = builder.and(filters, p);
                    }
                } else {
                    filters = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filters != null) {
            overall = builder.and(searchRestriction, filters);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filters != null) {
            overall = builder.and(filters);
            query.where(overall);
        }

        return entityManager.createQuery(query)
                .setFirstResult(searchCriteria.getPaginationCriteria().getOffset())
                .setMaxResults(searchCriteria.getPaginationCriteria().getItemsPerPage())
                .getResultList();
    }

    @Override
    public Long countAllBySearchCriteria(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<PersonalizedOffer> personalizedOfferRoot = query.from(PersonalizedOffer.class);
        query.select(builder.count(personalizedOfferRoot));

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(personalizedOfferRoot.get("name")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
//            Predicate p2 = builder.like(personalizedOfferRoot.get("id"), "%" + searchCriteria.getSearchKeyword() + "%");

            searchRestriction = builder.or(p1);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filters = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("status")) {
                        p = builder.equal(
                                personalizedOfferRoot.get(filterCriteria.getField()), Status.fromString(filterCriteria.getValue()));
                    }
                    if (filterCriteria.getField().equals("userInfo")) {
                        UserInfo userInfo = userRepository.getOne(new Long(filterCriteria.getValue()));
                        p = builder.equal(
                                personalizedOfferRoot.get(filterCriteria.getField()), userInfo);
                    }
                    if (filterCriteria.getField().equals("travelDestination")) {
                        p = builder.like(
                                personalizedOfferRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                }
                if (filters != null) {
                    if (filterCriteria.getField().equals("status")) {
                        filters = builder.or(filters, p);
                    } else {
                        filters = builder.and(filters, p);
                    }
                } else {
                    filters = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filters != null) {
            overall = builder.and(searchRestriction, filters);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filters != null) {
            overall = builder.and(filters);
            query.where(overall);
        }

        return entityManager.createQuery(query).getSingleResult();
    }
}
