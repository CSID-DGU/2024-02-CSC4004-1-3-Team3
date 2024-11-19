package auction.back.dto.request;

import auction.back.domain.User;
import lombok.Builder;

@Builder
public record UserSignUpRequestDto(
        String userName,
        String loginId,
        String loginPassword,
        String userEmail,
        boolean isAuthor) {
        public User toEntity() {
            return User.builder()
                    .userName(this.userName)
                    .loginId(this.loginId)
                    .loginPassword(this.loginPassword)
                    .userEmail(this.userEmail)
                    .isAuthor(this.isAuthor)
                    .build();
        }
}
