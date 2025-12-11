package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vilanelle_api.dao.IDAOUtilisateur;
import vilanelle_api.dto.request.AuthUserRequest;
import vilanelle_api.dto.response.AuthResponse;
import vilanelle_api.model.Utilisateur;
import vilanelle_api.security.jwt.JwtUtils;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    @Autowired
    private AuthenticationManager am;

    @Autowired
    private IDAOUtilisateur daoUtilisateur;

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthUserRequest request) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        // On demande à Spring Security si le user / password sont OK
        Authentication result = this.am.authenticate(auth);

        Utilisateur user = daoUtilisateur
                .findByUsername(request.getUsername()).orElseThrow();
        Integer userId = user.getId();

        return new AuthResponse(JwtUtils.generate(result, userId));
    }

    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}
