package auction.back.dto.request;

import lombok.Builder;

@Builder
public record PictureLikeRequestDto(
        Long userId,
        Long pictureId
) { }
