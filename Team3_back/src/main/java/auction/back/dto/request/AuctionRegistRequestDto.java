package auction.back.dto.request;

import lombok.Builder;

@Builder
public record AuctionRegistRequestDto(
        Long userId,
        Long pictureId,
        String startPrice
) {}
