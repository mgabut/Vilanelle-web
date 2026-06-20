package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.Photo;

import java.util.List;

public interface IDAOPhoto extends JpaRepository<Photo, Integer> {

    List<Photo> findByVisibleOnHomeTrue();

    List<Photo> findAllByOrderByPhotoYearDescPhotoMonthDesc();

    List<Photo> findByAlbumNameContainingIgnoreCaseOrderByPhotoYearDescPhotoMonthDesc(String albumName);

}
