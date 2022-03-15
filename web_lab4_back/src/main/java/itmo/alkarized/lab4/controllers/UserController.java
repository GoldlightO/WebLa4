package itmo.alkarized.lab4.controllers;

import itmo.alkarized.lab4.entites.UserRequest;
import itmo.alkarized.lab4.services.JWTProvider;
import itmo.alkarized.lab4.services.UserAuthorization;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public class UserController {
    private final AuthenticationManager authenticationManager;
    private final UserAuthorization userAuthorization;
    private final JWTProvider jwtProvider;

    @Autowired
    public UserController(AuthenticationManager authenticationManager,
                          UserAuthorization userAuthorization,
                          JWTProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userAuthorization = userAuthorization;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<String> getToken(@RequestBody UserRequest userRequest){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword())
            );
        } catch (Exception ex) {
            return new ResponseEntity<>("Invalid user", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(jwtProvider.generateToken(userRequest.getUsername()), HttpStatus.OK);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> registerNewUser(@RequestBody UserRequest userRequest){
        log.info("register new user");
        if (userAuthorization.register(userRequest)) return new ResponseEntity<>(HttpStatus.OK);
        else return ResponseEntity.badRequest().body("User with that name already exists");
    }

}
