package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.Partition;

import java.util.List;

public interface IDAOPartition extends JpaRepository<Partition, Integer> {

    public List<Partition> findByTitreContaining(String recherche);
}
