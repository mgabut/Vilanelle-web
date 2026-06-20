package vilanelle_api.model;

import jakarta.persistence.*;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String title;

    @Column
    private String albumName;

    @Column
    private Integer photoMonth;

    @Column
    private Integer photoYear;

    @Column
    private String imagePath;

    @Column
    private boolean visibleOnHome;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAlbumName() { return albumName; }
    public void setAlbumName(String albumName) { this.albumName = albumName; }

    public Integer getPhotoMonth() { return photoMonth; }
    public void setPhotoMonth(Integer photoMonth) { this.photoMonth = photoMonth; }

    public Integer getPhotoYear() { return photoYear; }
    public void setPhotoYear(Integer photoYear) { this.photoYear = photoYear; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public boolean isVisibleOnHome() { return visibleOnHome; }
    public void setVisibleOnHome(boolean visibleOnHome) { this.visibleOnHome = visibleOnHome; }
}
