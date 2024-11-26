package auction.back.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "AUCTION_TB")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String startPrice;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String ingPrice;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String endPrice;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column(nullable = true)
    private LocalDateTime finishAt;


    // ----------------------------------------------------
    @OneToOne
    @JoinColumn(name = "picture_id", nullable = false)
    private Picture picture;

    @OneToMany(mappedBy = "auction")
    private List<Mapping> mappingList;
}