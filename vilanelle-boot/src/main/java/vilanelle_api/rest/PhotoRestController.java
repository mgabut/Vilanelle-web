package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vilanelle_api.model.Photo;
import vilanelle_api.service.PhotoService;

import java.util.List;

@RestController
@RequestMapping("/api/photo")
@CrossOrigin(origins = "http://localhost:4200")
public class PhotoRestController {

    @Autowired
    private PhotoService srv;

    @GetMapping
    public List<Photo> findAll() {
        return this.srv.getAll();
    }

    @GetMapping("/home")
    public List<Photo> findAllVisibleOnHome() {
        return this.srv.getAllVisibleOnHome();
    }

    @GetMapping("/{id}")
    public Photo getPhotoById(@PathVariable Integer id) {
        return this.srv.getById(id);
    }

    @PostMapping
    public Photo createPhoto(@RequestBody Photo photo) {
        return this.srv.creatOrUpdateMap(photo);
    }

    @PutMapping("/{id}")
    public Photo updatePhoto(@PathVariable Integer id, @RequestBody Photo photo) {
        photo.setId(id);
        return srv.creatOrUpdateMap(photo);
    }

    @DeleteMapping("/{id}")
    public void deletePhoto(@PathVariable Integer id) {
        srv.deleteById(id);
    }
}