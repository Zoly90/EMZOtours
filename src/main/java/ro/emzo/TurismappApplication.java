package ro.emzo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ro.emzo.turismapp.core.service.UserService;

@SpringBootApplication
public class TurismappApplication {

	public static void main(String[] args) {
		SpringApplication.run(TurismappApplication.class, args);
	}
}
