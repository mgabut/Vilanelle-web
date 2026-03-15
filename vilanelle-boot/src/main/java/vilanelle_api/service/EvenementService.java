package vilanelle_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOEvenement;
import vilanelle_api.model.Evenement;

import java.util.List;
import java.util.Optional;

@Service
public class EvenementService {

    @Autowired
    private IDAOEvenement daoEvenement;

    public List<Evenement> getAll(){
        return daoEvenement.findAll();
    }

    public Evenement getById(Integer id){
        Optional<Evenement> opt = daoEvenement.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public Evenement creatOrUpdateMap(Evenement evenement) {
        return daoEvenement.save(evenement);
    }

    public void deleteById(Integer id) {
        daoEvenement.deleteById(id);
    }

    public void delete(Evenement evenement) {
        daoEvenement.delete(evenement);
    }
}
