package auction.back.repository;

import auction.back.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByPictureIdAndUserId(Long pictureId, Long userId);
}
