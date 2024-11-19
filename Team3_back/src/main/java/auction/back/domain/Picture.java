package auction.back.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "PICTURE_TB")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String ingredient;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sizeHeight;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sizeWidth;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String makeTime;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String condition;

    // photo가 true이면 사진 작품
    @Column(nullable = false)
    private Boolean isPhoto;

    @Column(nullable = false)
    private String createAt;

    // ----------------------------------------------------------------------------------

    @OneToOne(mappedBy = "picture")
    private Auction auction;

    @OneToMany(mappedBy = "picture")
    private List<PictureImg> pictureImgList;

    @OneToMany(mappedBy = "picture")
    private List<Like> likeList;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;
}