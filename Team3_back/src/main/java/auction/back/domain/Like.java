package auction.back.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Table(name = "LIKE_TB")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // ------------------------------------------------------------

    @ManyToOne
    @JoinColumn(name = "picture_id", nullable = false)
    private Picture picture;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}