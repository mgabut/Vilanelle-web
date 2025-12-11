package vilanelle_api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="evenement")
public class Evenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(nullable = false)
    protected String libelle;

    //gerer heure + date
    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    protected LocalDateTime date;

    @Column(nullable = false)
    protected String lieu;

    @Column(nullable = false)
    protected String ville;

    @Column(nullable = false)
    protected int cp;

    public Evenement(String libelle, LocalDateTime date, String lieu, String ville, int cp) {
        this.libelle = libelle;
        this.date = date;
        this.lieu = lieu;
        this.ville = ville;
        this.cp = cp;
    }

    public Evenement() {}

    public Integer getId() {
        return id;
    }

    public String getLibelle() {
        return libelle;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getLieu() {
        return lieu;
    }

    public String getVille() {
        return ville;
    }

    public int getCp() {
        return cp;
    }

    public void setCp(int cp) {
        this.cp = cp;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

