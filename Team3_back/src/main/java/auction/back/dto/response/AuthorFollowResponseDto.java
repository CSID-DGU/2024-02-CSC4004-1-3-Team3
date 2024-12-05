package auction.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AuthorFollowResponseDto {
    private Long id;
    private String name;
    private Long followerCount;
    private String url;

    public static AuthorFollowResponseDto of(Object[] object) {
        return AuthorFollowResponseDto.builder()
                .id((Long) object[0])
                .name((String) object[1])
                .followerCount((Long) object[2])
                .url((String) object[3])
                .build();
    }
}
