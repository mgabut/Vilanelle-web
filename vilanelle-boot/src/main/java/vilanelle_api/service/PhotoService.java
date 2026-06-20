package vilanelle_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOPhoto;
import vilanelle_api.model.Photo;

import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    private IDAOPhoto daoPhoto;

    public List<Photo> getAll() {
        return daoPhoto.findAllByOrderByPhotoYearDescPhotoMonthDesc();
    }

    public List<Photo> getAllVisibleOnHome() {
        return daoPhoto.findByVisibleOnHomeTrue();
    }

    public List<Photo> searchByAlbum(String albumName) {
        return daoPhoto.findByAlbumNameContainingIgnoreCaseOrderByPhotoYearDescPhotoMonthDesc(albumName);
    }

    public Photo getById(Integer id) {
        Optional<Photo> opt = daoPhoto.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public Photo creatOrUpdateMap(Photo photo) {
        return daoPhoto.save(photo);
    }

    public void deleteById(Integer id) {
        daoPhoto.deleteById(id);
    }

    public void delete(Photo photo) {
        daoPhoto.delete(photo);
    }
}
