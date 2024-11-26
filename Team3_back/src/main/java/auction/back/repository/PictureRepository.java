package auction.back.repository;

import auction.back.domain.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    @Query("SELECT p FROM Picture p WHERE " +
            "(:photo IS NULL AND :picture IS NULL) OR " +
            "(:photo = true AND p.isPhoto = true) OR " +
            "(:picture = true AND p.isPhoto = false)")
    List<Picture> findAllPicture(@Param("photo") Boolean photo, @Param("picture") Boolean picture);

    @Query("SELECT p, COUNT(l) as likeCount FROM Picture p LEFT JOIN p.likeList l GROUP BY p ORDER BY COUNT(l) DESC")
    List<Object[]> findTopLikedPictures(@Param("limit") int limit);

    @Query
    Optional<Picture> findById(Long id);
}
