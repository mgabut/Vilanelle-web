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


import java.time.LocalDateTime;
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
            @RequestParam("file") MultipartFile file
    ) {
        String path = storageService.save(file);

        Partition partition = new Partition();
        partition.setTitre(titre);
        partition.setAuteur(auteur);
        partition.setPdfPath(path);
        partition.setPdfName(file.getOriginalFilename());
        partition.setDateCreation(LocalDateTime.now());

        return partitionService.create(partition);
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Partition>> getAll() {
        return ResponseEntity.ok(partitionService.getAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Partition> getById(@PathVariable Integer id) {
        Partition partition = partitionService.getById(id);

        if (partition == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(partition);
    }

    // UPDATE sans changer le PDF
    @PutMapping("/{id}")
    public ResponseEntity<Partition> update(
            @PathVariable Integer id,
            @RequestBody Partition updatedPartition
    ) {
        Partition existing = partitionService.getById(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setTitre(updatedPartition.getTitre());
        existing.setAuteur(updatedPartition.getAuteur());

        Partition saved = partitionService.update(existing);
        return ResponseEntity.ok(saved);
    }

    // UPDATE avec remplacement éventuel du PDF
    @PutMapping(value = "/{id}/with-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Partition> updateWithFile(
            @PathVariable Integer id,
            @RequestParam String titre,
            @RequestParam(required = false) String auteur,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        Partition existing = partitionService.getById(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setTitre(titre);
        existing.setAuteur(auteur);

        if (file != null && !file.isEmpty()) {
            String path = storageService.save(file);
            existing.setPdfPath(path);
            existing.setPdfName(file.getOriginalFilename());
        }

        Partition saved = partitionService.update(existing);
        return ResponseEntity.ok(saved);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Partition existing = partitionService.getById(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        partitionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ⬇️ Téléchargement PDF
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Integer id) {
        Partition partition = partitionService.getById(id);
        Resource file = storageService.load(partition.getPdfPath());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"partition.pdf\""
                )
                .body(file);
    }
}
