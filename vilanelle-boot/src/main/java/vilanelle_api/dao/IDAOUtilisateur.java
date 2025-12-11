package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.Utilisateur;

import java.util.Optional;

public interface IDAOUtilisateur extends JpaRepository<Utilisateur, Integer> {

    public Optional<Utilisateur> findByUsername(String Username);

    
}
