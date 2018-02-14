package ro.emzo.turismapp.holiday.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import ro.emzo.turismapp.core.model.FilterCriteria;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.model.*;
import ro.emzo.turismapp.home_page.dao.HolidayTypesRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.Date;
import java.util.List;

/**
 * Created by E5570_2 on 2018-01-13.
 */
public class HolidayRepositoryImpl implements CustomHolidayRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private HolidaySubcategoriesRepository holidaySubcategoriesRepository;

    @Autowired
    private HolidayTypesRepository holidayTypesRepository;

    @Override
    public List<Holiday> findAllBySearchCriteriaWithPaginationForHolidayList(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Holiday> query = builder.createQuery(Holiday.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(holidayRoot.get("accommodationName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p2 = builder.like(
                    builder.lower(holidayRoot.get("country")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p3 = builder.like(
                    builder.lower(holidayRoot.get("city")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");

            searchRestriction = builder.or(p1, p2, p3);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
                    if (!StringUtils.isEmpty(filterCriteria.getField())) {
//                        if (filterCriteria.getField().equals("holidayTypes")) {
//                            HolidayTypes holidayTypes = holidayTypesRepository.findOne(new Long(filterCriteria.getValue()));
//                            Join<Holiday, HolidayTypes> join = holidayRoot.join(Holiday_.holidayTypes);
//                            p = builder.equal(
//                                    join.get("holidayTypes"), holidayTypes);
//                        }
                        if (filterCriteria.getField().equals("holidaySubcategories")) {
                            HolidaySubcategories holidaySubcategories = holidaySubcategoriesRepository.findOne(new Long(filterCriteria.getValue()));
                            p = builder.equal(
                                    holidayRoot.get(filterCriteria.getField()), holidaySubcategories);
                        }
                    }
                } else {

                }
                if (filterRestriction != null) {
                    filterRestriction = builder.and(filterRestriction, p);
                } else {
                    filterRestriction = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filterRestriction != null) {
            overall = builder.and(searchRestriction, filterRestriction);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filterRestriction != null) {
            overall = builder.and(filterRestriction);
            query.where(overall);
        }

        return entityManager.createQuery(query)
                .setFirstResult(searchCriteria.getPaginationCriteria().getOffset())
                .setMaxResults(searchCriteria.getPaginationCriteria().getItemsPerPage())
                .getResultList();
    }

    @Override
    public Long countAllBySearchCriteriaForHolidayList(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);
        query.select(builder.count(holidayRoot));

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(holidayRoot.get("accommodationName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p2 = builder.like(
                    builder.lower(holidayRoot.get("country")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p3 = builder.like(
                    builder.lower(holidayRoot.get("city")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");

            searchRestriction = builder.or(p1, p2, p3);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
//                    if (filterCriteria.getField().equals("holidayTypes")) {
//                        HolidayTypes holidayTypes = holidayTypesRepository.findOne(new Long(filterCriteria.getValue()));
//                        p = builder.equal(
//                                holidayRoot.get(filterCriteria.getField()), holidayTypes);
//                    }
                    if (filterCriteria.getField().equals("holidaySubcategories")) {
                        HolidaySubcategories holidaySubcategories = holidaySubcategoriesRepository.findOne(new Long(filterCriteria.getValue()));
                        p = builder.equal(
                                holidayRoot.get(filterCriteria.getField()), holidaySubcategories);
                    }
                }
                if (filterRestriction != null) {
                    filterRestriction = builder.and(filterRestriction, p);
                } else {
                    filterRestriction = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filterRestriction != null) {
            overall = builder.and(searchRestriction, filterRestriction);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filterRestriction != null) {
            overall = builder.and(filterRestriction);
            query.where(overall);
        }

        return entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public List<Holiday> findAllBySearchCriteriaWithPaginationForQuickFilter(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Holiday> query = builder.createQuery(Holiday.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            Predicate departureDatesFrom = null;
            Predicate departureDatesUntil = null;
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("country")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("nrPeople")) {
                        break;
//                        p = builder.like(
//                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("nrNights")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("departureDatesFrom")) {
                        Date date = new Date(new Long(filterCriteria.getValue()));
                        departureDatesFrom = builder.lessThanOrEqualTo(
                                holidayRoot.get(filterCriteria.getField()), date);
                    }
                    if (filterCriteria.getField().equals("departureDatesUntil")) {
                        Date date = new Date(new Long(filterCriteria.getValue()));
                        departureDatesUntil = builder.greaterThanOrEqualTo(
                                holidayRoot.get(filterCriteria.getField()), date);
                    }
                }
                if (!filterCriteria.getField().equals("departureDatesFrom") && !filterCriteria.getField().equals("departureDatesUntil")) {
                    if (filterRestriction != null) {
                        filterRestriction = builder.and(filterRestriction, p);
                    } else {
                        filterRestriction = builder.or(p);
                    }
                }
            }
            if (departureDatesFrom != null && departureDatesUntil != null) {
                filterRestriction = builder.and(filterRestriction, departureDatesFrom, departureDatesUntil);
            }
        }

        query.where(filterRestriction);

        return entityManager.createQuery(query)
                .setFirstResult(searchCriteria.getPaginationCriteria().getOffset())
                .setMaxResults(searchCriteria.getPaginationCriteria().getItemsPerPage())
                .getResultList();
    }

    @Override
    public Long countAllBySearchCriteriaForQuickFilter(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);
        query.select(builder.count(holidayRoot));

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            Predicate departureDatesFrom = null;
            Predicate departureDatesUntil = null;
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("country")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("nrPeople")) {
                        break;
//                        p = builder.like(
//                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("nrNights")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("departureDatesFrom")) {
                        Date date = new Date(new Long(filterCriteria.getValue()));
                        departureDatesFrom = builder.greaterThanOrEqualTo(
                                holidayRoot.get(filterCriteria.getField()), date);
                    }
                    if (filterCriteria.getField().equals("departureDatesUntil")) {
                        Date date = new Date(new Long(filterCriteria.getValue()));
                        departureDatesUntil = builder.lessThanOrEqualTo(
                                holidayRoot.get(filterCriteria.getField()), date);
                    }
                }
                if (!filterCriteria.getField().equals("departureDatesFrom") && !filterCriteria.getField().equals("departureDatesUntil")) {
                    if (filterRestriction != null) {
                        filterRestriction = builder.and(filterRestriction, p);
                    } else {
                        filterRestriction = builder.or(p);
                    }
                }
            }
            if (departureDatesFrom != null && departureDatesUntil != null) {
                filterRestriction = builder.and(filterRestriction, departureDatesFrom, departureDatesUntil);
            }
        }

        query.where(filterRestriction);

        return entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public List<Holiday> findAllBySearchCriteriaWithPaginationForManagementTable(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Holiday> query = builder.createQuery(Holiday.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(holidayRoot.get("accommodationName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p2 = builder.like(
                    builder.lower(holidayRoot.get("country")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p3 = builder.like(
                    builder.lower(holidayRoot.get("city")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");

            searchRestriction = builder.or(p1, p2, p3);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("transportation")) {
                        p = builder.equal(
                                holidayRoot.get(filterCriteria.getField()), Transportation.fromString(filterCriteria.getValue()));
                    }
//                    if (filterCriteria.getField().equals("userInfo")) {
//                        UserInfo userInfo = userRepository.getOne(new Long(filterCriteria.getValue()));
//                        p = builder.equal(
//                                personalizedOfferRoot.get(filterCriteria.getField()), userInfo);
//                    }
//                    TODO add advanced filter for period filtering
//                    TODO add advanced filter for starting price filtering
                    if (filterCriteria.getField().equals("country")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("city")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                }
                if (filterRestriction != null) {
                    if (filterCriteria.getField().equals("status")) {
                        filterRestriction = builder.or(filterRestriction, p);
                    } else {
                        filterRestriction = builder.and(filterRestriction, p);
                    }
                } else {
                    filterRestriction = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filterRestriction != null) {
            overall = builder.and(searchRestriction, filterRestriction);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filterRestriction != null) {
            overall = builder.and(filterRestriction);
            query.where(overall);
        }

        return entityManager.createQuery(query)
                .setFirstResult(searchCriteria.getPaginationCriteria().getOffset())
                .setMaxResults(searchCriteria.getPaginationCriteria().getItemsPerPage())
                .getResultList();
    }

    @Override
    public Long countAllBySearchCriteriaForManagementTable(SearchCriteria searchCriteria) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<Holiday> holidayRoot = query.from(Holiday.class);
        query.select(builder.count(holidayRoot));

        Predicate searchRestriction = null;
        if (!StringUtils.isEmpty(searchCriteria.getSearchKeyword())) {
            Predicate p1 = builder.like(
                    builder.lower(holidayRoot.get("accommodationName")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p2 = builder.like(
                    builder.lower(holidayRoot.get("country")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");
            Predicate p3 = builder.like(
                    builder.lower(holidayRoot.get("city")), "%" + searchCriteria.getSearchKeyword().toLowerCase() + "%");

            searchRestriction = builder.or(p1, p2, p3);
        }

        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        Predicate filterRestriction = null;
        if (listOfFilterCriteria != null && listOfFilterCriteria.size() != 0) {
            for (FilterCriteria filterCriteria : listOfFilterCriteria) {
                Predicate p = null;
                if (!StringUtils.isEmpty(filterCriteria.getField())) {
                    if (filterCriteria.getField().equals("transportation")) {
                        p = builder.equal(
                                holidayRoot.get(filterCriteria.getField()), Transportation.fromString(filterCriteria.getValue()));
                    }
//                    if (filterCriteria.getField().equals("userInfo")) {
//                        UserInfo userInfo = userRepository.getOne(new Long(filterCriteria.getValue()));
//                        p = builder.equal(
//                                personalizedOfferRoot.get(filterCriteria.getField()), userInfo);
//                    }
//                    TODO add advanced filter for period filtering
//                    TODO add advanced filter for starting price filtering
                    if (filterCriteria.getField().equals("country")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                    if (filterCriteria.getField().equals("city")) {
                        p = builder.like(
                                holidayRoot.get(filterCriteria.getField()), "%" + filterCriteria.getValue() + "%");
                    }
                }
                if (filterRestriction != null) {
                    if (filterCriteria.getField().equals("status")) {
                        filterRestriction = builder.or(filterRestriction, p);
                    } else {
                        filterRestriction = builder.and(filterRestriction, p);
                    }
                } else {
                    filterRestriction = builder.or(p);
                }
            }
        }

        Predicate overall;
        if (searchRestriction != null && filterRestriction != null) {
            overall = builder.and(searchRestriction, filterRestriction);
            query.where(overall);
        } else if (searchRestriction != null) {
            overall = builder.and(searchRestriction);
            query.where(overall);
        } else if (filterRestriction != null) {
            overall = builder.and(filterRestriction);
            query.where(overall);
        }

        return entityManager.createQuery(query).getSingleResult();
    }
}
