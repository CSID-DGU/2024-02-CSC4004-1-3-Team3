package auction.back.repository;

import auction.back.domain.Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MappingRepository extends JpaRepository<Mapping, Long> {
    boolean existsByAuctionIdAndUserId(Long auctionId, Long userId);
}
