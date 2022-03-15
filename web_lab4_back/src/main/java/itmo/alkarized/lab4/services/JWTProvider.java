package itmo.alkarized.lab4.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;

@Service
public class JWTProvider {
    @Value("${jwt.token.secretKey}")
    private String secretKey;
    @Value("${jwt.token.expireTime}")
    private int expTime;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean  validateToken(String token, String uname){
        final String username = extractUsername(token);
        return (username.equals(uname) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    public String generateToken(String username) {
        Claims claims = Jwts.claims().setSubject(username);

        Date now = new Date();
        Date tokenTimeToLiveDate = new Date(now.getTime() + expTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(tokenTimeToLiveDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
}
