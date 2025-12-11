package vilanelle_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOPartition;
import vilanelle_api.model.Partition;


import java.util.List;

@Service
public class PartitionService {

    @Autowired
    private IDAOPartition daoPartition;

    public List<Partition> getAll(){
        return daoPartition.findAll();
    }

    public Partition getById(Integer id){
        return daoPartition.findById(id).orElse(null);
    }

    public List<Partition> findByTitreContaining (String libelle){
        return daoPartition.findByTitreContaining(libelle);
    }

    public Partition create(Partition partition){
        return daoPartition.save(partition);
    }

    public Partition update(Partition partition){
        return daoPartition.save(partition);
    }

    public void delete(Integer id){
        daoPartition.deleteById(id);
    }
}
