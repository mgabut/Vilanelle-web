package vilanelle_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${storage.base-path}")
    private String basePath;

    public String save(MultipartFile file) {
        try {
            Path storageDir = Paths.get(basePath).toAbsolutePath();
            Files.createDirectories(storageDir);

            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path destination = storageDir.resolve(filename);

            file.transferTo(destination.toFile());

            return basePath + "/" + filename;
        } catch (Exception e) {
            throw new RuntimeException("Erreur stockage fichier", e);
        }
    }

    public Resource load(String filePath) {
        try {
            Path path = Paths.get(filePath).toAbsolutePath();
            return new UrlResource(path.toUri());
        } catch (Exception e) {
            throw new RuntimeException("Fichier introuvable", e);
        }
    }
}