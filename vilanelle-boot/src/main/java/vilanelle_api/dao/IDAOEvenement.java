package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.Evenement;

public interface IDAOEvenement extends JpaRepository<Evenement, Integer> {
}
