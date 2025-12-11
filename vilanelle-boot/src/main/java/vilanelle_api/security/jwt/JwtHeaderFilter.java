package vilanelle_api.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import vilanelle_api.dao.IDAOUtilisateur;
import vilanelle_api.model.Utilisateur;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtHeaderFilter extends OncePerRequestFilter {

    @Autowired
    private IDAOUtilisateur daoUtilisateur;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();


        // On laisse passer la route d'auth sans vérifier le token
        if (uri.equals("/api/auth")) {
            System.out.println(">>> /api/auth détecté, on ne vérifie pas le JWT");
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        System.out.println(">>> Authorization header = " + header);

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            Optional<Integer> optId = JwtUtils.validateAndGetId(token);

            if (optId.isPresent()) {
                Integer id = optId.get();
                System.out.println(">>> ID extrait du token = " + id);

                Utilisateur user = daoUtilisateur.findById(id).orElse(null);

                if (user != null) {

                    String role = user.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER";

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(),
                                    null,
                                    List.of(new SimpleGrantedAuthority(role))
                            );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    System.out.println(">>> Aucun compte trouvé pour id = " + id);
                }
            } else {
                System.out.println(">>> Token invalide ou expiré");
            }
        } else {
            System.out.println(">>> Aucun header Authorization Bearer trouvé");
        }

        filterChain.doFilter(request, response);
    }
}