package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vilanelle_api.model.Partition;
import vilanelle_api.service.PartitionService;
import vilanelle_api.service.StorageService;


import java.util.List;

@RestController
@RequestMapping("/api/partitions")
@CrossOrigin
public class PartitionRestController {

    private final PartitionService partitionService;
    private final StorageService storageService;

    public PartitionRestController(
            PartitionService partitionService,
            StorageService storageService
    ) {
        this.partitionService = partitionService;
        this.storageService = storageService;
    }

    // 📥 Upload PDF + création partition
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Partition upload(
            @RequestParam String titre,
            @RequestParam(required = false) String auteur,
            @RequestParam MultipartFile file
    ) {
        String path = storageService.save(file);
        Partition partition = new Partition(titre, auteur, path);
        return partitionService.create(partition);
    }

    // 📄 Liste des partitions
    @GetMapping
    public List<Partition> getAll() {
        return partitionService.getAll();
    }

    // ⬇️ Téléchargement PDF
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Integer id) {
        Partition partition = partitionService.getById(id);
        Resource file = storageService.load(partition.getPath());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"partition.pdf\""
                )
                .body(file);
    }
}
