package ro.emzo.turismapp.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.emzo.turismapp.core.model.City;
import ro.emzo.turismapp.core.model.Country;
import ro.emzo.turismapp.core.repository.CityRepository;
import ro.emzo.turismapp.core.repository.CountryRepository;

import java.util.List;

/**
 * Created by E5570_2 on 2018-01-07.
 */
@Service
public class CoreService {

    @Autowired
    CountryRepository countryRepository;

    @Autowired
    CityRepository cityRepository;

    public List<Country> getAllCountries() {
        List<Country> listOfCountries = countryRepository.findAll();
        return listOfCountries;
    }

    public List<City> getAllCities() {
        List<City> listOfCountries = cityRepository.findAll();
        return listOfCountries;
    }
}
