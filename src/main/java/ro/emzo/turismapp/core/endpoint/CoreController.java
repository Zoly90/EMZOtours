package ro.emzo.turismapp.core.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.emzo.turismapp.core.model.Country;
import ro.emzo.turismapp.core.service.CoreService;

import java.util.List;

/**
 * Created by E5570_2 on 2018-01-08.
 */
@RestController
@RequestMapping("/api/turism-app")
public class CoreController {

    @Autowired
    CoreService coreService;

    @GetMapping(value = "/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        return new ResponseEntity<>(coreService.getAllCountries(), HttpStatus.OK);
    }
}
