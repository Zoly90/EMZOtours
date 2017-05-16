package ro.emzo.turismapp.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.core.model.HolidayMainCategories;
import ro.emzo.turismapp.core.model.HolidayTypes;
import ro.emzo.turismapp.core.service.HomePage;
import ro.emzo.turismapp.core.service.HomePageService;

@RestController
@RequestMapping("/api/turism-app")
public class HomePageController {

	@Autowired
	HomePageService homePageService;
	
	@GetMapping("/home-page")
	public ResponseEntity<HomePage> getSubcategories() {
		return new ResponseEntity<>(homePageService.getHomePageData(), HttpStatus.OK);
	}
}
