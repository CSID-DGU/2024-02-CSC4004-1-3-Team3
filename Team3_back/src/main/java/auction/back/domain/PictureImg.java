package auction.back.domain;

import jakarta.persistence.*;
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
    private long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    // -----------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "picture_id", nullable = false)
    private Picture picture;
}