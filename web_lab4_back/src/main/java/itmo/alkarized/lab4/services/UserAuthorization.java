package itmo.alkarized.lab4.services;

import itmo.alkarized.lab4.entites.User;
import itmo.alkarized.lab4.entites.UserRequest;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Log
@Service
public class UserAuthorization {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserAuthorization(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean register(UserRequest userRequest){
        try{
            log.info("Authorize new user");
            userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            User user = userService.findAndCreateUserByName(userRequest);
            if (user == null) return false;
            userService.registerNewUser(user);
            log.info("user created");
            return true;
        } catch (Exception e){
            return false;
        }
    }
}
