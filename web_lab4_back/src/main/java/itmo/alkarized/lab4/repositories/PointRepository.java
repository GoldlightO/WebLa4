package itmo.alkarized.lab4.repositories;

import itmo.alkarized.lab4.entites.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
}
