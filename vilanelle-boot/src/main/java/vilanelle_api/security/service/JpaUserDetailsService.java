package vilanelle_api.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOUtilisateur;
import vilanelle_api.model.Utilisateur;

import java.util.function.Function;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private IDAOUtilisateur dao; // il faut renommer ton repository

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Utilisateur user = dao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String role = user.isAdmin() ? "ADMIN" : "USER";

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(role) // Spring va automatiquement préfixer par ROLE_
                .build();
    }
}

