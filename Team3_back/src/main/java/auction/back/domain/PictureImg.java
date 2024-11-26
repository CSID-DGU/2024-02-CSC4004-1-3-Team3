package auction.back.domain;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Table(name = "PICTUREIMG_TB")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
public class PictureImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    // -----------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "picture_id", nullable = false)
    private Picture picture;

    @Builder
    public PictureImg(Long id, String url, Picture picture) {
        this.id = id;
        this.url = url;
        this.picture = picture;
    }
}