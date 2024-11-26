package auction.back.repository;

import auction.back.domain.PictureImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureImgRepository extends JpaRepository<PictureImg, Long> {
}
