package auction.back.repository;

import auction.back.domain.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Query("SELECT a FROM Auction a WHERE a.finishAt IS NULL ORDER BY a.startAt ASC")
    List<Auction> findOngoingAuctionsOrderByStartAtAsc();

    @Query("SELECT a FROM Auction a WHERE a.finishAt > CURRENT_TIMESTAMP ORDER BY a.startAt DESC")
    List<Auction> findOngoingAuctions();
    @Query("SELECT a FROM Auction a WHERE a.finishAt <= CURRENT_TIMESTAMP ORDER BY a.startAt DESC")
    List<Auction> findFinishAuctions();
}
