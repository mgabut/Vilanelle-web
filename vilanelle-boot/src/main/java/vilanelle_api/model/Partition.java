package vilanelle_api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

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
    protected String pdfPath;

    @Column
    protected String pdfName;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    protected LocalDateTime dateCreation;

    public Partition(String titre, String auteur, String pdfPath, String pdfName) {
        this.titre = titre;
        this.auteur = auteur;
        this.pdfPath = pdfPath;
        this.pdfName = pdfName;
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

    public void setPdfPath(String pdfPath) {this.pdfPath = pdfPath;}

    public String getPdfPath() {return pdfPath;}

    public void setPdfName(String pdfName) {this.pdfName = pdfName;}

    public String getPdfName() {return pdfName;}

    public LocalDateTime getDateCreation() {return dateCreation;}

    public void setDateCreation(LocalDateTime dateCreation) {this.dateCreation = dateCreation;}
}