package ro.emzo.turismapp.holiday.service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.FilterCriteria;
import ro.emzo.turismapp.core.model.PagedList;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.dao.HolidayDataService;
import ro.emzo.turismapp.holiday.dao.HolidayRepository;
import ro.emzo.turismapp.holiday.dao.HolidaySubcategoriesRepository;
import ro.emzo.turismapp.holiday.model.Holiday;
import ro.emzo.turismapp.holiday.model.HolidaySubcategories;
import ro.emzo.turismapp.holiday.model.HolidayTypes;
import ro.emzo.turismapp.holiday.to.HolidayListDataTO;
import ro.emzo.turismapp.holiday.to.HolidayManagementTableDataTO;
import ro.emzo.turismapp.home_page.dao.HolidayTypesRepository;

@Service
public class HolidayService {

    @Autowired
    private HolidayDataService holidaySummaryDataService;

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private HolidayTypesRepository holidayTypesRepository;

    public PagedList<HolidayListDataTO> getAllHolidaysBySearchCriteria(SearchCriteria searchCriteria) {
        PagedList<HolidayListDataTO> pagedList = new PagedList<>();
        pagedList.setOffset(searchCriteria.getPaginationCriteria().getOffset());
        pagedList.setItemsPerPage(searchCriteria.getPaginationCriteria().getItemsPerPage());
        List<Holiday> holidayList = null;
        List<FilterCriteria> listOfFilterCriteria = searchCriteria.getFilterCriteria();
        for (FilterCriteria filterCriteria : listOfFilterCriteria) {
            if (filterCriteria.getField().equals("holidayTypes")) {
                HolidayTypes holidayType = holidayTypesRepository.findOne(new Long(filterCriteria.getValue()));
                holidayList = holidayRepository.findByHolidayTypes(holidayType);
                pagedList.setItemsTotal((long) holidayList.size());
            } else {
                holidayList = holidayRepository.findAllBySearchCriteriaWithPaginationForHolidayList(searchCriteria);
                Long totalItems = holidayRepository.countAllBySearchCriteriaForHolidayList(searchCriteria);
                pagedList.setItemsTotal(totalItems);
            }
        }

        List<HolidayListDataTO> data = holidayList.stream()
                .map(holiday -> new HolidayListDataTO(holiday.getId(), holiday.getAccommodationName(), holiday.getNrStars(),
                        holiday.getPresentationImage(), holiday.getEarlyBookingDeadline(), holiday.getEarlyBookingPercentage(),
                        holiday.getLastMinuteBeginningDate(), holiday.getLastMinutePercentage(),
                        holiday.getCountry(), holiday.getCity(), holiday.getStreet(), holiday.getStreetNr(), holiday.getZip(),
                        holiday.getTransportation(), holiday.getDepartureFrom(), holiday.getNrNights(), holiday.getAccommodationType(),
                        holiday.getFoodBoard(), holiday.getShortDescription(), holiday.getStartingPrice(), holiday.getDepartureDatesFrom(),
                        holiday.getDepartureDatesUntil(), false)).collect(Collectors.toList());
        pagedList.setData(data);

        return pagedList;
    }

    public PagedList<HolidayListDataTO> getAllHolidaysBySearchCriteriaForQuickFilter(SearchCriteria searchCriteria) {
        PagedList<HolidayListDataTO> pagedList = new PagedList<>();
        pagedList.setOffset(searchCriteria.getPaginationCriteria().getOffset());
        pagedList.setItemsPerPage(searchCriteria.getPaginationCriteria().getItemsPerPage());
        List<Holiday> holidayList = holidayRepository.findAllBySearchCriteriaWithPaginationForQuickFilter(searchCriteria);
        List<HolidayListDataTO> data = holidayList.stream()
                .map(holiday -> new HolidayListDataTO(holiday.getId(), holiday.getAccommodationName(), holiday.getNrStars(),
                        holiday.getPresentationImage(), holiday.getEarlyBookingDeadline(), holiday.getEarlyBookingPercentage(),
                        holiday.getLastMinuteBeginningDate(), holiday.getLastMinutePercentage(),
                        holiday.getCountry(), holiday.getCity(), holiday.getStreet(), holiday.getStreetNr(), holiday.getZip(),
                        holiday.getTransportation(), holiday.getDepartureFrom(), holiday.getNrNights(), holiday.getAccommodationType(),
                        holiday.getFoodBoard(), holiday.getShortDescription(), holiday.getStartingPrice(), holiday.getDepartureDatesFrom(),
                        holiday.getDepartureDatesUntil(), false)).collect(Collectors.toList());
        pagedList.setData(data);
        Long totalItems = holidayRepository.countAllBySearchCriteriaForQuickFilter(searchCriteria);
        pagedList.setItemsTotal(totalItems);
        return pagedList;
    }

    public PagedList<HolidayManagementTableDataTO> getAllHolidaysForManagementBySearchCriteria(SearchCriteria searchCriteria) {
        PagedList<HolidayManagementTableDataTO> pagedList = new PagedList<>();
        pagedList.setOffset(searchCriteria.getPaginationCriteria().getOffset());
        pagedList.setItemsPerPage(searchCriteria.getPaginationCriteria().getItemsPerPage());
        List<Holiday> holidayList = holidayRepository.findAllBySearchCriteriaWithPaginationForManagementTable(searchCriteria);
        List<HolidayManagementTableDataTO> data = holidayList.stream()
                .map(holiday -> new HolidayManagementTableDataTO(holiday.getId(), holiday.getAccommodationName(),
                        holiday.getCountry(), holiday.getCity(),
                        holiday.getDepartureDatesFrom(), holiday.getDepartureDatesUntil(),
                        holiday.getTransportation(), holiday.getStartingPrice()))
                .collect(Collectors.toList());
        pagedList.setData(data);
        Long totalItems = holidayRepository.countAllBySearchCriteriaForManagementTable(searchCriteria);
        pagedList.setItemsTotal(totalItems);
        return pagedList;
    }

    public Holiday getHolidayById(Long holidayId) {
        Holiday result = holidaySummaryDataService.getHolidayById(holidayId);
        return result;
    }

    public void deleteHoliday(Long holidayId) {
        holidaySummaryDataService.deleteHoliday(holidayId);
    }
}
