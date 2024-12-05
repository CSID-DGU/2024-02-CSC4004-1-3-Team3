package auction.back.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;
import java.util.Set;

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
    private String userName;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private boolean isAuthor;

    @Column
    private String userImage;

    // ---------------------------------------------------

    @OneToMany(mappedBy = "user")
    private Set<Mapping> mappingSet;

    @OneToMany(mappedBy = "user")
    private List<Picture> pictureList;

    @OneToMany(mappedBy = "user")
    private Set<Like> likeSet;

    @OneToMany(mappedBy = "user")
    private Set<Follow> followerList;

    @Builder
    public User(Long id, String loginId, String loginPassword, String userName, String userEmail, String userImage, boolean isAuthor) {
        this.id = id;
        this.loginId = loginId;
        this.loginPassword = loginPassword;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userImage = userImage;
        this.isAuthor = isAuthor;
    }
}