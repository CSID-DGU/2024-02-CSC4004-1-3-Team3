package auction.back.repository;

import auction.back.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndPictureId(Long userId, Long pictureId);
    boolean existsByPictureIdAndUserId(Long pictureId, Long userId);
}
