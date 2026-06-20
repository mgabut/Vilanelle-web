package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vilanelle_api.model.Affiche;
import vilanelle_api.service.AfficheService;
import vilanelle_api.service.StorageService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/affiche")
@CrossOrigin
public class AfficheRestController {

    private final AfficheService srv;
    private final StorageService storageService;

    @Value("${storage.affiches-path}")
    private String affichesPath;

    public AfficheRestController(AfficheService srv, StorageService storageService) {
        this.srv = srv;
        this.storageService = storageService;
    }

    @GetMapping
    public List<Affiche> findAll() {
        return srv.getAll();
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getImage(@PathVariable Integer id) {
        Affiche affiche = srv.getById(id);
        if (affiche == null || affiche.getImagePath() == null) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = storageService.load(affiche.getImagePath());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam int position
    ) {
        if (srv.count() >= 4) {
            return ResponseEntity.badRequest().body("Maximum 4 affiches autorisées");
        }
        String filePath = storageService.save(file, affichesPath);
        Affiche affiche = new Affiche();
        affiche.setImagePath(filePath);
        affiche.setPosition(position);
        return ResponseEntity.ok(srv.save(affiche));
    }

    @PatchMapping("/{id}/position")
    public ResponseEntity<Affiche> updatePosition(
            @PathVariable Integer id,
            @RequestBody Map<String, Integer> body
    ) {
        Affiche affiche = srv.getById(id);
        if (affiche == null) {
            return ResponseEntity.notFound().build();
        }
        affiche.setPosition(body.get("position"));
        return ResponseEntity.ok(srv.save(affiche));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Affiche affiche = srv.getById(id);
        if (affiche == null) {
            return ResponseEntity.notFound().build();
        }
        srv.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
