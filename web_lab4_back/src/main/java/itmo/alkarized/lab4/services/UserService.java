package itmo.alkarized.lab4.services;

import itmo.alkarized.lab4.entites.User;
import itmo.alkarized.lab4.entites.UserRequest;
import itmo.alkarized.lab4.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Log
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }

    public void registerNewUser(User user) {
        userRepository.save(user);
    }

    public User findAndCreateUserByName(UserRequest userRequest){
        log.info("UserService: find user or create new");
        User userFromDB = loadUserByUsername(userRequest.getUsername());
        if (userFromDB != null) return null;
        else {
            log.info("UserService: create new");
            User user = new User();
            user.setPassword(userRequest.getPassword());
            user.setUsername(userRequest.getUsername());
            return user;
        }
    }
}
