package auction.back.dto.response;

import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AuthorViewResponseDto {
    private Long id;
    private String userName;
    private String userEmail;
    private String userImage;

    public static AuthorViewResponseDto of(User author) {
        return AuthorViewResponseDto.builder()
                .id(author.getId())
                .userName(author.getUserName())
                .userEmail(author.getUserEmail())
                .userImage(author.getUserImage())
                .build();
    }
}
