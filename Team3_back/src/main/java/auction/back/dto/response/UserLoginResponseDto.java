package auction.back.dto.response;

import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserLoginResponseDto {

    private Long id;
    private String userName;
    private String userEmail;
    private boolean isAuthor;
    private String userImage;

    public static UserLoginResponseDto of(User user) {
        return UserLoginResponseDto.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .isAuthor(user.isAuthor())
                .userImage(user.getUserImage())
                .build();
    }

}
