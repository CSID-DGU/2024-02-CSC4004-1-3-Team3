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
    @Query("SELECT a.author.id as id, a.author.userName as name, COUNT(a.user) as followerCount " +
            "FROM Follow a GROUP BY a.author.id, a.author.userName ORDER BY COUNT(a.user) DESC")
    List<Object[]> findTopAuthorsWithFollowerCount();

    @Query("SELECT u FROM User u WHERE u.isAuthor = true ORDER BY u.userName ASC")
    List<User> findAllAuthorsOrderByName();

    @Query("SELECT u FROM User u WHERE u.isAuthor = true ORDER BY " +
            "(SELECT COUNT(f) FROM Follow f WHERE f.author = u) DESC, u.userName ASC")
    List<User> findAllAuthorsOrderByFollowCountAndName();

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.author.id = :authorId")
    int countFollowersByAuthorId(@Param("authorId") Long authorId);

    @Query("SELECT p FROM Picture p WHERE p.user.id = :authorId ORDER BY p.createAt DESC")
    List<Picture> findRecentPicturesByAuthorId(@Param("authorId") Long authorId, Pageable pageable);
}
