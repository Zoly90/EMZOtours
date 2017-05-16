package ro.emzo.turismapp.core.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_login")
public class UserLogin extends BaseModel{
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "email_address")
	private String emailAddress;
	
	@Column(name = "role")
	private String role;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userLogin")
	@JsonBackReference
	private Collection<UserInfo> userInfo;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	public Collection<UserInfo> getUserInfo() {
		return userInfo;
	}
	
	public void setUserInfo(Collection<UserInfo> userInfo) {
		this.userInfo = userInfo;
	}
}
