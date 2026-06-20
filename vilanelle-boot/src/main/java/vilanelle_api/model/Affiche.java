package vilanelle_api.model;

import jakarta.persistence.*;

@Entity
public class Affiche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String imagePath;

    @Column
    private int position;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
}
