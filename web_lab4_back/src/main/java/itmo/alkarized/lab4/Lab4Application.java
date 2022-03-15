package itmo.alkarized.lab4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "itmo.alkarized.lab4.configurations", "itmo.alkarized.lab4.controllers",
        "itmo.alkarized.lab4.entites", "itmo.alkarized.lab4.services", "itmo.alkarized.lab4.repositories",
        "itmo.alkarized.lab4.security"
})
public class Lab4Application {

    public static void main(String[] args) {
        SpringApplication.run(Lab4Application.class, args);
    }

}
