package ro.emzo.turismapp.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.emzo.turismapp.user.dao.UserLoginRepository;
import ro.emzo.turismapp.user.dao.UserRepository;
import ro.emzo.turismapp.user.model.UserLogin;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by E5570_2 on 2017-06-30.
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserLoginRepository userLoginRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserLogin userLogin = userLoginRepository.findByUsername(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(userLogin.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(
                userLogin.getEmailAddress(), userLogin.getPassword(), grantedAuthorities);
    }
}
