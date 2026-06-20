package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.Affiche;

import java.util.List;

public interface IDAOAffiche extends JpaRepository<Affiche, Integer> {
    List<Affiche> findAllByOrderByPositionAsc();
}
