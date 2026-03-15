package vilanelle_api.model;

import jakarta.persistence.*;

@Entity
@Table(name="part")
public class Partition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(nullable = false)
    protected String titre;

    @Column
    protected String auteur;

    @Column
    protected String path;

    public Partition(String titre, String auteur, String path) {
        this.titre = titre;
        this.auteur = auteur;
        this.path = path;
    }

    public Partition() {
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setPath(String path) {this.path = path;}

    public String getPath() {return path;}
}