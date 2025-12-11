package vilanelle_api.security.jwt;

import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.JoseException;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public class JwtUtils {
    private final static String JWT_KEY = "6A9qdGs7GfYpH97m5YLzw2Z4eyk92Rkq36QWuoDqqxcPQr2ZpEQlKrXIIzapEtom";
    private final static long JWT_EXPIRATION = 3_600_000; // 1 heure

    private JwtUtils() { }

    public static String generate(Authentication auth, Integer idCompte) {

        JwtClaims claims = new JwtClaims();
        JsonWebSignature jws = new JsonWebSignature();

        claims.setSubject(auth.getName());

        claims.setClaim("id", idCompte);

        //test token avec le role

        String role = auth.getAuthorities().stream()
                .findFirst()
                .map(a -> a.getAuthority().replace("ROLE_", ""))
                .orElse("USER");

        claims.setClaim("role", role);

        claims.setIssuedAtToNow();
        claims.setExpirationTimeMinutesInTheFuture((int)(JWT_EXPIRATION / 60000));

        jws.setPayload(claims.toJson());
        jws.setAlgorithmHeaderValue("HS256");
        jws.setKey(new HmacKey(JWT_KEY.getBytes()));

        try {
            return jws.getCompactSerialization();
        }

        catch (JoseException e) {
            return "";
        }
    }

    public static Optional<String> validateAndGetSubjet(String token) {
        try {
            JwtConsumer consumer = new JwtConsumerBuilder()
                    .setVerificationKey(new HmacKey(JWT_KEY.getBytes()))
                    .setRequireExpirationTime()
                    .build();

            JwtClaims claims = consumer.processToClaims(token);
            return Optional.ofNullable(claims.getSubject());
        }

        catch (Exception ex) {
            return Optional.empty();
        }
    }

    public static Optional<Integer> validateAndGetId(String token) {

        try {
            JwtConsumer consumer = new JwtConsumerBuilder()
                    .setVerificationKey(new HmacKey(JWT_KEY.getBytes()))
                    .setRequireExpirationTime()
                    .build();

            JwtClaims claims = consumer.processToClaims(token);

            // Récupérer l'id en Long (car jose4j stocke TOUJOURS en Long)
            Long idLong = claims.getClaimValue("id", Long.class);

            // Convertir en Integer
            return Optional.of(idLong.intValue());

        } catch (Exception ex) {
            return Optional.empty();
        }
    }
}
