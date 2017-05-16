package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.UserInfo;
import ro.emzo.turismapp.core.model.UserLogin;

public interface UserRepository extends JpaRepository<UserInfo, Long>{
	
	UserInfo findByUserLogin(UserLogin userLogin);
	
//	UserInfo save(UserInfo userInfo);
//	
//	void delete (Long userInfoId);
//	
//	List<UserInfo> findAll();
	
}
