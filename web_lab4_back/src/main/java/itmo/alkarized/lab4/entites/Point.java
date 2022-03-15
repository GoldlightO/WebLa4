package itmo.alkarized.lab4.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "POINT_TABLE")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int x;
    private double y;
    private int r;
    private boolean result;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinColumn(name = "id_user")
    private User userOwner;

    public void setResult() {
        this.result = (x >= 0 && y >= 0 && y <= r && x <= r / 2) ||
                (x >= 0 && y <= 0 && y >= -Math.sqrt(r * r - 4 * x * x) / 2) ||
                (x <= 0 && y >= 0 && y <= (double) r / 2 + x);

    }
}
