package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vilanelle_api.dao.IDAOEvenement;
import vilanelle_api.model.Evenement;

import java.util.List;

@RestController
@RequestMapping("/api/evenement")
public class EvenementRestController {

    @Autowired
    private IDAOEvenement daoEvenement;

    @GetMapping
    public List<Evenement> findAll(){
        return this.daoEvenement.findAll();
    }

}
