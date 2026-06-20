package vilanelle_api.service;

import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOAffiche;
import vilanelle_api.model.Affiche;

import java.util.List;

@Service
public class AfficheService {

    private final IDAOAffiche dao;

    public AfficheService(IDAOAffiche dao) {
        this.dao = dao;
    }

    public List<Affiche> getAll() {
        return dao.findAllByOrderByPositionAsc();
    }

    public Affiche getById(Integer id) {
        return dao.findById(id).orElse(null);
    }

    public Affiche save(Affiche affiche) {
        return dao.save(affiche);
    }

    public void deleteById(Integer id) {
        dao.deleteById(id);
    }

    public long count() {
        return dao.count();
    }
}
