package ro.emzo.turismapp.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.user.model.UserLogin;

public interface UserLoginRepository extends JpaRepository<UserLogin, Long>{

	UserLogin findByUsername(String username);

}
