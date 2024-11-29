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
    @Query("SELECT p FROM Picture p LEFT JOIN FETCH p.auction a WHERE " +
            "(:photo IS NULL AND :picture IS NULL) OR " +
            "(:photo = true AND p.isPhoto = true) OR " +
            "(:picture = true AND p.isPhoto = false) " +
            "ORDER BY p.id DESC")
    List<Picture> findAllPicture(@Param("photo") Boolean photo, @Param("picture") Boolean picture);

    @Query("SELECT COUNT(l) > 0 FROM Like l WHERE l.picture.id = :pictureId AND l.user.id = :userId")
    boolean existsByPictureIdAndUserId(@Param("pictureId") Long pictureId, @Param("userId") Long userId);

    @Query("SELECT p, COUNT(l) as likeCount FROM Picture p LEFT JOIN p.likeList l GROUP BY p ORDER BY COUNT(l) DESC")
    List<Object[]> findTopLikedPictures(@Param("limit") int limit);

    @Query("SELECT p FROM Picture p " +
            "LEFT JOIN FETCH p.pictureImgList " +
            "LEFT JOIN FETCH p.user " +
            "WHERE p.id = :pictureId")
    Optional<Picture> findByIdWithDetails(@Param("pictureId") Long pictureId);

    @Query("SELECT p FROM Picture p " +
            "LEFT JOIN FETCH p.pictureImgList " +
            "WHERE p.user.id = :userId " +
            "AND p.auction IS NULL " +
            "AND (SELECT COUNT(l) FROM Like l WHERE l.picture = p) >= :minLikes")
    List<Picture> findPicturesForAuctionRegistration(
            @Param("userId") Long userId,
            @Param("minLikes") int minLikes);

    @Query("SELECT COUNT(l) FROM Like l WHERE l.picture.id = :pictureId")
    int countLikesByPictureId(@Param("pictureId") Long pictureId);
}
