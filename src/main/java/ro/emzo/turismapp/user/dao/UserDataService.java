package ro.emzo.turismapp.user.dao;

import org.springframework.stereotype.Service;

import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.model.UserLogin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserDataService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserLoginRepository userLoginRepository;

	public UserLogin credentialsByUsername(String username) {
		return userLoginRepository.findByUsername(username);
	}

	public UserLogin credentialsByEmail(String email) {
		return userLoginRepository.findByEmailAddress(email);
	}
	
	public UserInfo getUserInfo(UserLogin userLogin) {
		return userRepository.findByUserLogin(userLogin);
	}
	
	public UserInfo save(UserInfo userInfo) {
		return userRepository.save(userInfo);
	}
	
	public UserInfo getUserInfo(Long userInfoId) {
		return userRepository.findOne(userInfoId);
	}
	
	public List<UserInfo> getAllUsers() {
		return userRepository.findAll();
	}

    public void deleteUser(Long userId) {
		userRepository.delete(userId);
    }
}
