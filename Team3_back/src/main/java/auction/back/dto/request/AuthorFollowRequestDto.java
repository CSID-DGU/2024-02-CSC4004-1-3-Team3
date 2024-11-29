package auction.back.dto.request;

import lombok.Builder;

@Builder
public record AuthorFollowRequestDto(
        Long userId,
        Long authorId
) {
}
