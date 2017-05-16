package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.UserLogin;

public interface UserLoginRepository extends JpaRepository<UserLogin, Long>{

	UserLogin findByUsername(String username);

}
