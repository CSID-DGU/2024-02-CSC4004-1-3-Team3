package auction.back.repository;

import auction.back.domain.Picture;
import auction.back.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AuthorRepository extends JpaRepository<User, Long> {
    @Query("SELECT u.id, u.userName, COUNT(f), u.userImage FROM User u LEFT JOIN u.followerList f WHERE u.isAuthor = true GROUP BY u ORDER BY COUNT(f) DESC")
    List<Object[]> findTopAuthorsWithFollowerCount();

    @Query("SELECT u, COUNT(f) FROM User u LEFT JOIN Follow f ON u = f.author WHERE u.isAuthor = true GROUP BY u ORDER BY u.userName")
    List<Object[]> findAllAuthorsOrderByName();

    @Query("SELECT u, COUNT(f) FROM User u LEFT JOIN Follow f ON u = f.author WHERE u.isAuthor = true GROUP BY u ORDER BY COUNT(f) DESC, u.userName")
    List<Object[]> findAllAuthorsOrderByFollowCountAndName();

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.author.id = :authorId")
    int countFollowersByAuthorId(@Param("authorId") Long authorId);

    @Query("SELECT p FROM Picture p WHERE p.user.id = :authorId ORDER BY p.createAt DESC")
    List<Picture> findRecentPicturesByAuthorId(@Param("authorId") Long authorId, Pageable pageable);
}
