package ro.emzo.turismapp.home_page.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.holiday.model.HolidayMainCategories;
import ro.emzo.turismapp.holiday.model.HolidayTypes;
import ro.emzo.turismapp.home_page.service.HomePage;
import ro.emzo.turismapp.home_page.service.HomePageService;

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
