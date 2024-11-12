package auction.back.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Table(name = "USER_TB")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String loginId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String loginPassword;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private boolean isAuthor;

    // ---------------------------------------------------

    @OneToMany(mappedBy = "user")
    private List<Mapping> mappingList;

    @OneToMany(mappedBy = "user")
    private List<Picture> pictureList;

    @OneToMany(mappedBy = "user")
    private List<Like> likeList;
}