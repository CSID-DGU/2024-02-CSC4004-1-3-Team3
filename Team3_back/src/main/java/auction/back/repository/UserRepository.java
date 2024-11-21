package auction.back.repository;

import auction.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByLoginId(String loginId);

    Optional<User> findByLoginId(String loginId);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.pictureList " +
            "LEFT JOIN FETCH u.likeSet l LEFT JOIN FETCH l.picture " +
            "LEFT JOIN FETCH u.mappingSet m LEFT JOIN FETCH m.auction a LEFT JOIN FETCH a.picture " +
            "WHERE u.id = :userId")
    Optional<User> findByIdWithDetails(@Param("userId") Long userId);

}
