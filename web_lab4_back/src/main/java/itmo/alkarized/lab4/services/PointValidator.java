package itmo.alkarized.lab4.services;

import itmo.alkarized.lab4.entites.Point;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PointValidator {
    public boolean validate(Point point) {
        int[] array_x = {-3, -2, -1, 0, 1, 2, 3, 4, 5};
        int[] array_r = {1, 2, 3, 4, 5};
        return (Arrays.stream(array_x).anyMatch((value -> value == point.getX())) &&
                Arrays.stream(array_r).anyMatch((value -> value == point.getR())) &&
                point.getY() > -3 && point.getY() < 3);

    }
}
