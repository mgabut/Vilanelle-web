package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vilanelle_api.model.Evenement;
import vilanelle_api.service.EvenementService;

import java.util.List;

@RestController
@RequestMapping("/api/evenement")
public class EvenementRestController {

    @Autowired
    private EvenementService srv;

    @GetMapping
    public List<Evenement> findAll(){
        return this.srv.getAll();
    }

    @GetMapping("/{id}")
    public Evenement getEvenementById(@PathVariable Integer id) {return this.srv.getById(id);}

    @PostMapping
    public Evenement createEvenement(@RequestBody Evenement evenement){return this.srv.creatOrUpdateMap(evenement);}

    @PutMapping("/{id}")
    public Evenement updateEvenement(@PathVariable Integer id, @RequestBody Evenement evenement) {
        evenement.setId(id);
        return srv.creatOrUpdateMap(evenement);
    }

    @DeleteMapping("/{id}")
    public void deleteEvenement(@PathVariable Integer id) {
        srv.deleteById(id);
    }



}
