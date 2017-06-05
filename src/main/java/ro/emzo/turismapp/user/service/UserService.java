package ro.emzo.turismapp.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;

@Service
public class UserService {
	
	@Autowired
	private UserDataService userDataService;
	
	public UserInfo getUserLoggingIn(String username) {
		UserLogin userLogin = getUserLogin(username);
		return userDataService.getUserInfo(userLogin);
	}
	
	private UserLogin getUserLogin(String username) {
		return userDataService.getLoginCredentials(username);
	}
	
	public UserInfo createUser(UserInfo userInfo) {
		return userDataService.save(userInfo);
	}
	
	public UserInfo getUserInfo(Long userInfoId) {
		return userDataService.getUserInfo(userInfoId);
	}
	
	public List<UserInfo> getAllUsers() {
		return userDataService.getAllUsers();
	}
	
}
