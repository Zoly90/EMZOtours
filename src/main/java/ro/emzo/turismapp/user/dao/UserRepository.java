package ro.emzo.turismapp.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;

public interface UserRepository extends JpaRepository<UserInfo, Long>, CustomUserRepository{
	
	UserInfo findByUserLogin(UserLogin userLogin);
}
