package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vilanelle_api.model.Partition;
import vilanelle_api.service.PartitionService;


import java.util.List;

@RestController
@RequestMapping("/api/partition")
public class PartitionRestController {

    @Autowired
    private PartitionService PartitionSrv;

    @GetMapping
    public List<Partition> findAll(){
        return this.PartitionSrv.getAll();
    }

    public List<Partition> findByLibelleContaining(String recherche){
        return this.PartitionSrv.findByTitreContaining(recherche);
    }

    @PostMapping
    public Partition ajoutPartition(@PathVariable Partition partition){
        return this.PartitionSrv.create(partition);
    }
}
