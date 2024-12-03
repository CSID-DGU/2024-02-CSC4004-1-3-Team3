package auction.back.dto.request;

import lombok.Builder;

@Builder
public record BidAuctionRequestDto(
        Long userId,
        Long auctionId,
        String bidPrice
) {
}
