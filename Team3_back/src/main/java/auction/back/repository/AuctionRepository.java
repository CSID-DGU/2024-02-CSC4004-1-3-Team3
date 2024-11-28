package auction.back.repository;

import auction.back.domain.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {

    @Query("SELECT a FROM Auction a WHERE a.finishAt > CURRENT_TIMESTAMP ORDER BY a.startAt DESC")
    List<Auction> findOngoingAuctions();
    @Query("SELECT a FROM Auction a WHERE a.finishAt <= CURRENT_TIMESTAMP ORDER BY a.startAt DESC")
    List<Auction> findFinishAuctions();

    @Query("SELECT a FROM Auction a JOIN FETCH a.picture p JOIN FETCH p.pictureImgList JOIN FETCH p.user WHERE a.id = :auctionId")
    Optional<Auction> findById(@Param("auctionId") Long auctionId);
}
