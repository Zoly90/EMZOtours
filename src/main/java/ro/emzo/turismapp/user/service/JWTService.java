package ro.emzo.turismapp.user.service;

import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;

import io.jsonwebtoken.*;
import ro.emzo.turismapp.user.model.UserInfo;

import java.util.Date;
import java.util.UUID;

/**
 * Created by E5570_2 on 2017-07-03.
 */

@Service
public class JWTService {

    static final String SECRET = "ThisIsASecret";
    static final String SUBJECT = "login";

    /**
     * Sample method to construct a JWTService
     *
     * @param userInfo
     * @param ttlMillis
     * @return {token}
     */
    public String createJWT(UserInfo userInfo, long ttlMillis) {

        /**
         *  The JWTService signature algorithm we will be using to sign the token
         */
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long currentMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentMillis);

        /**
         * We will sign our JWTService which our ApiKey secret
         */
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        /**
         *  Let's set the JWT Claims
         */
        JwtBuilder builder = Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(currentDate)
                .setSubject(SUBJECT)
                .setIssuer(userInfo.getFirstName() + " " + userInfo.getLastName())
                .claim("name", userInfo.getTitle() + " " + userInfo.getFirstName() + " " + userInfo.getLastName())
                .claim("userID", "" + userInfo.getId())
                .claim("username", "" + userInfo.getUserLogin().getUsername())
                .claim("emailAddress", "" + userInfo.getUserLogin().getEmailAddress())
                .claim("role", "" + userInfo.getUserLogin().getRole().getRoleKey());

        builder.signWith(signatureAlgorithm, signingKey);

        /**
         * if it has been specified, let's add the expiration
         */
        if (ttlMillis >= 0) {
            long expMillis = currentMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        /**
         * Builds the JWTService and serializes it to a compact, URL-safe string
         */
        return builder.compact();
    }

    /**
     * Sample method to validate and read the JWTService
     *
     * @param jwt
     */
    public void parseJWT(String jwt) {

        /**
         * This line will throw an exception if it is not a signed JWS (as expected)
         */
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET))
                .parseClaimsJws(jwt).getBody();
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration: " + claims.getExpiration());
    }
}
