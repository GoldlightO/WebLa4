import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "itmo.goldlighto.lab4.configurations", "itmo.goldlighto.lab4.controllers",
        "itmo.goldlighto.lab4.entites", "itmo.goldlighto.lab4.services", "itmo.goldlighto.lab4.repositories",
        "itmo.goldlighto.lab4.security"
})
public class Lab4Application {

    public static void main(String[] args) {
        SpringApplication.run(Lab4Application.class, args);
    }

}
