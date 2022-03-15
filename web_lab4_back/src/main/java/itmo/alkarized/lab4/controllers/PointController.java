package itmo.alkarized.lab4.controllers;

import itmo.alkarized.lab4.entites.Point;
import itmo.alkarized.lab4.entites.User;
import itmo.alkarized.lab4.entites.UserRequest;
import itmo.alkarized.lab4.repositories.PointRepository;
import itmo.alkarized.lab4.repositories.UserRepository;
import itmo.alkarized.lab4.services.JWTProvider;
import itmo.alkarized.lab4.services.PointValidator;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log
@RequestMapping(value = "points", produces = MediaType.APPLICATION_JSON_VALUE)
public class PointController {
    private final PointRepository pointRepository;
    private final PointValidator validator;
    private final UserRepository userRepository;
    private final JWTProvider jwtProvider;

    public PointController(PointRepository pointRepository,
                           PointValidator validator,
                           UserRepository userRepository,
                           JWTProvider jwtProvider) {
        this.pointRepository = pointRepository;
        this.validator = validator;
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping()
    public ResponseEntity<?> addPoint(@RequestBody Point point, @RequestHeader(value = "Authorization") String token){

        if (!validator.validate(point)) return new ResponseEntity<>("Invalid point", HttpStatus.BAD_REQUEST);
        point.setResult();
        User user = userRepository.findByUsername(jwtProvider.extractUsername(token.substring(7)));
        if (user == null) return new ResponseEntity<>("Invalid username of person", HttpStatus.BAD_REQUEST);
        point.setUserOwner(user);
        point = pointRepository.save(point);
        user.getPoints().add(point);
        return new ResponseEntity<>(point, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getAllPoints(@RequestHeader(value = "Authorization") String token){
        log.info("get all points by username - " + jwtProvider.extractUsername(token.substring(7)));
        User user = userRepository.findByUsername(jwtProvider.extractUsername(token.substring(7)));
        if (user == null) return new ResponseEntity<>("Invalid username of person", HttpStatus.BAD_REQUEST);
        List<Point> points = user.getPoints();
        return new ResponseEntity<>(points, HttpStatus.OK);
    }
}
