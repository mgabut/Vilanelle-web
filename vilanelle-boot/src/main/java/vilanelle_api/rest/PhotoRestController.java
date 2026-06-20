package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vilanelle_api.model.Photo;
import vilanelle_api.service.PhotoService;
import vilanelle_api.service.StorageService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/photo")
@CrossOrigin
public class PhotoRestController {

    private final PhotoService srv;
    private final StorageService storageService;

    @Value("${storage.pictures-path}")
    private String picturesPath;

    public PhotoRestController(PhotoService srv, StorageService storageService) {
        this.srv = srv;
        this.storageService = storageService;
    }

    @GetMapping
    public List<Photo> findAll(@RequestParam(required = false) String album) {
        if (album != null && !album.isBlank()) {
            return srv.searchByAlbum(album);
        }
        return srv.getAll();
    }

    @GetMapping("/home")
    public List<Photo> findAllVisibleOnHome() {
        return this.srv.getAllVisibleOnHome();
    }

    @GetMapping("/{id}")
    public Photo getPhotoById(@PathVariable Integer id) {
        return this.srv.getById(id);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getImage(@PathVariable Integer id) {
        Photo photo = srv.getById(id);
        if (photo == null || photo.getImagePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = storageService.load(photo.getImagePath());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Photo upload(
            @RequestParam String title,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean visibleOnHome,
            @RequestParam(required = false) String albumName,
            @RequestParam(required = false) Integer photoMonth,
            @RequestParam(required = false) Integer photoYear
    ) {
        String filePath = storageService.save(file, picturesPath);

        Photo photo = new Photo();
        photo.setTitle(title);
        photo.setImagePath(filePath);
        photo.setVisibleOnHome(visibleOnHome);
        photo.setAlbumName(albumName);
        photo.setPhotoMonth(photoMonth);
        photo.setPhotoYear(photoYear);

        return srv.creatOrUpdateMap(photo);
    }

    @PatchMapping("/{id}/visibility")
    public ResponseEntity<Photo> updateVisibility(
            @PathVariable Integer id,
            @RequestBody Map<String, Boolean> body
    ) {
        Photo photo = srv.getById(id);
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }

        photo.setVisibleOnHome(body.get("visibleOnHome"));
        return ResponseEntity.ok(srv.creatOrUpdateMap(photo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Integer id) {
        Photo photo = srv.getById(id);
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }
        srv.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
